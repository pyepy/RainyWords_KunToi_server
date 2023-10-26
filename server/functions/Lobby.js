const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist } = require('../utils/serverdata.js');
const { trackTime } = require('./GameTimerS.js');


let RoomNums = []
let Rooms = []

function generateRoomNo() {
    let result = ('00000'+Math.floor(Math.random()*100000)).slice(-5)

    if (!(RoomNums.includes(result))){
        return result;
    } else{
        return generateRoomNo();
    }
  };

function findMyRoomByName(name) {
    for (const room of Rooms){
        if(room.players.includes(name)){
            return room;
        }
    }

    //return 'CanNotFindRoom'
    return new Room('error',0 ,[]);
};

function findMyRoomByRoomNo(roomNo) {
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
    this.roomNo = generateRoomNo();
    RoomNums.push(this.roomNo);

};

const createRoom = function (data) {
    const socket = this;
    let index = findNameIndex(socket.id,"id");
    let roomCreator = getUserInfo(index);
    let roomCreatorName = "";
    let roomCreatorID = "";
    if (index != -1) {
        roomCreatorName = roomCreator.name;
        roomCreatorID = roomCreator.socketID;
    }
    

    let myRoom = new Room(data.gameMode,1, [roomCreatorName])
    Rooms.push(myRoom);
    addRoomlist(myRoom);
    // console.log('Current rooms (create):');
    // console.log(Rooms);

    socket.join(myRoom.roomNo); //join room
    socket.emit('roomCreated', {myRoom})
    updateUserInfo(myRoom.roomNo,index,"room");
};

const giveRoomInfo = function () {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    let user = getUserInfo(index);
    let myRoom = "";
    if (index != -1) {
        let myName = user.name;
        myRoom = findMyRoomByName(myName);
    }
    socket.emit('giveRoomInfo', {myRoom})
};

const leaveRoom = function() {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    let user = getUserInfo(index);
    let myRoom = "";
    let myName = ""
    if (index != -1) {
        myName = user.name;
        myRoom = findMyRoomByName(myName);
        updateUserInfo("",index,"room");
        socket.leave(myRoom.roomNo);
    }

    if (myRoom.roomPlayerCount === 1){
        let index = Rooms.indexOf(myRoom);
        Rooms.splice(index, 1)
        removeRoomlist(myRoom);
    } else {
        for (const room of Rooms){
            if(room.players.includes(myName) ){
                let index = room.players.indexOf(myName);
                room.players.splice(index, 1)
                room.roomPlayerCount -= 1;
                updateRoomlist(room);
            }
        }

    }

    // console.log('Current rooms (leave):');
    // console.log(Rooms);

    socket.to(myRoom.roomNo).emit("updateRoomInfo", {myRoom});
}

const joinGameRoom = function(data) {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    let user = getUserInfo(index);
    let myName = "";
    if (index != -1) {
        myName = user.name;
    }

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
        socket.to(myRoom.roomNo).emit("updateRoomInfo", {myRoom});

        updateUserInfo(myRoom.roomNo,index,"room");
    };
}

const startGame = function() {
    const socket = this;

    let index = findNameIndex(socket.id,"id");
    let user = getUserInfo(index);
    let myName = user.name;
    let myRoom = findMyRoomByName(myName)

    socket.emit('goToGame')
    socket.to(myRoom.roomNo).emit("goToGame");

    console.log('Current rooms (game): -------------------------------');
    console.log(Rooms);
    console.log('-------------------------------------------------------');


    socket.to(myRoom.roomNo).emit("updateRoomInfo", {myRoom});

    let namelist = getNamelist();
    let currentRoom = getSpecificInfo(index,"room");
    //console.log(namelist)
    namelist = namelist.filter((user) => user.room == currentRoom);
    io.to(currentRoom).emit("send_score", {namelist});
    //console.log({namelist});
    //io.to(currentRoom).emit("start_timer");
    trackTime('hi');
};

module.exports = { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame, Rooms };