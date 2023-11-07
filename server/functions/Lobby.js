const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo,
     addRoomlist, removeRoomlist, updateRoomlist, getRoomlist, getRoomNumbers } = require('../utils/serverdata.js');
const { trackTime } = require('./GameTimerS.js');


let RoomNums = getRoomNumbers();
let Rooms = getRoomlist();

function generateRoomNo(gm) {
    let result;
    if (gm == "Practice") {
        result = "P"+('00000'+Math.floor(Math.random()*100000)).slice(-5)
    } else {
        result = ('00000'+Math.floor(Math.random()*100000)).slice(-5)
    }
    if (!(RoomNums.includes(result))){
        return result;
    } else{
        return generateRoomNo(gm);
    }
  };

function findMyRoomByName(name) {
    let Rooms = getRoomlist();
    for (const room of Rooms){
        if(room.players.includes(name)){
            return room;
        }
    }

    //return 'CanNotFindRoom'
    return new Room('error',0 ,[]);
};

function findMyRoomByRoomNo(roomNo) {
    let Rooms = getRoomlist();
    for (const room of Rooms){
        if(room.roomNo === roomNo){
            return room;
        }
    }

    return 'CanNotFindRoom';
};

function Room( gameMode, roomPlayerCount, players){
    this.gameMode = gameMode;
    this.players= players;
    this.roomPlayerCount = roomPlayerCount;
    this.roomNo = generateRoomNo(gameMode);
    this.gameTime = -1;
    this.wordDifficulty = 2;
    this.timeInSec = 300;
    this.speedMultiplier = 1;
};

const createRoom = function (data) {
    const socket = this;
    let index = findNameIndex(socket.id,"id");
    if (index == -1) {
        socket.emit('canNotFindRoom');
        return;
    }
    let roomCreator = getUserInfo(index);
    roomCreatorName = roomCreator.name;
    roomCreatorID = roomCreator.socketID;
    
    

    let myRoom = new Room(data.gameMode,1, [roomCreatorName])
    addRoomlist(myRoom);
    // console.log('Current rooms (create):');
    // console.log(Rooms);

    socket.join(myRoom.roomNo); //join room
    if (data.gameMode == 'Practice'){
        socket.emit('practiceRoomCreated', {myRoom})
    } else socket.emit('roomCreated', {myRoom})
    updateUserInfo(myRoom.roomNo,index,"room");
};

const giveRoomInfo = function () {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    let user = getUserInfo(index);
    let myRoom = "";
    let myName = ""
    if (index != -1) {
        myName = user.name;
        myRoom = findMyRoomByName(myName);
    }
    console.log("giveroominfo debug",index, user, myName)
    socket.emit('giveRoomInfo', {myRoom})
};

const leaveRoom = function() {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    if (index == -1) {
        return;
    }
    let user = getUserInfo(index);
    myName = user.name;
    myRoom = findMyRoomByName(myName);
    updateUserInfo("",index,"room");
    socket.leave(myRoom.roomNo);

    if (myRoom.roomPlayerCount === 1){
        if (myRoom.gameTime != -1) {
            clearInterval(myRoom.gameTime);
            myRoom.gameTime = -1;
        }
        removeRoomlist(myRoom);
    } else {
        for (const room of Rooms){
            if(room.players.includes(myName) ){
                let index = room.players.indexOf(myName);
                room.players.splice(index, 1)
                room.roomPlayerCount -= 1;
                updateRoomlist(room);
                let namelist = getNamelist();
                if (room.gameTime != -1) {
                    clearInterval(room.gameTime);
                    socket.in(room.roomNo).emit("timesUp");
                    room.gameTime = -1;
                }
            }
        }

    }

    // console.log('Current rooms (leave):');
    // console.log(Rooms);

    socket.in(myRoom.roomNo).emit("updateRoomInfo", {myRoom});
}

const joinGameRoom = function(data) {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    if (index == -1) {
        socket.emit('canNotFindRoom');
        return;
    }
    let user = getUserInfo(index);
    let myName = user.name;

    let tryRoom = findMyRoomByRoomNo(data.roomToJoin);  

    if(tryRoom === 'CanNotFindRoom'){
        socket.emit('canNotFindRoom');
    // } else if (tryRoom.roomPlayerCount >= 2) {  //more than 2 ppl in rooms
    //     socket.emit('canNotFindRoom');
    } else {
        socket.emit('roomFound');

        for (const room of Rooms){
            if(room.roomNo === data.roomToJoin){
                room.players.push(myName);
                room.roomPlayerCount += 1;
                updateRoomlist(room);
            } 
        }

        // console.log('Current rooms (join):');
        // console.log(Rooms);
        

        let myRoom = findMyRoomByName(myName);

        socket.join(myRoom.roomNo); //join room
        socket.in(myRoom.roomNo).emit("updateRoomInfo", {myRoom});

        updateUserInfo(myRoom.roomNo,index,"room");
    };
}

const startGame = function(data) {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    if (index == -1) {
        socket.emit('canNotFindRoom');
        return;
    }
    let user = getUserInfo(index);
    let myName = user.name;
    let myRoom = findMyRoomByName(myName);

    myRoom.wordDifficulty = data.wordDifficultyLevel;
    myRoom.timeInSec = data.timeInSec;
    myRoom.speedMultiplier = data.speedMultiplier;
    updateRoomlist(myRoom)

    io.in(myRoom.roomNo).emit("goToGame");
    io.in(myRoom.roomNo).emit("setting_info",{"wordDifficulty":myRoom.wordDifficulty,"speedMultiplier":myRoom.speedMultiplier});

    console.log('Current rooms (game): -------------------------------');
    console.log(Rooms);
    console.log('-------------------------------------------------------');


    socket.in(myRoom.roomNo).emit("updateRoomInfo", {myRoom});

    let namelist = getNamelist();
    //console.log(namelist)
    namelist = namelist.filter((user) => user.room == myRoom.roomNo);
    console.log("startgamedaimai", index,socket.id, myRoom.roomNo, namelist);
    io.in(myRoom.roomNo).emit("send_score", {namelist});
    //console.log({namelist});
    //io.in(currentRoom).emit("start_timer");

    const timer1off = setTimeout(() => {
        if (myRoom.gameMode == 'Practice'){
            trackTime('hi',myRoom,60);
        } else trackTime('hi',myRoom,data.timeInSec);
    }, 4000);
};

const deleteRoom = function () {
    removeRoomlist(myRoom);
}

const sendLobbyMessage = (data) => {
    const socket = this;
    let myRoom = findMyRoomByName(data.userName);
    let name = data.userName;
    let message = data.myMessage;
    io.in(myRoom.roomNo).emit("send_Lobby_message", {name, message});
};


module.exports = { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame, sendLobbyMessage, Rooms }; 