const { io } = require('../utils/socket-server.js')

let RoomNums = []
let Rooms = []

function generateRoomNo() {
    const number = '1234567890';
    let result = '';
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * number.length);
      result += number.charAt(randomIndex);
    }

    if (!(RoomNums.includes(result))){
        return result;
    } else{
        return generateRoomNo();
    }
  };

function findMyRoomByName(name) {
    for (const room of Rooms){
        if(room.player1 === name || room.player2 === name){
            return room;
        }
    }

    return new Room('error',0 ,'waiting','waiting','?????');
};

function findMyRoomByRoomNo(roomNo) {
    for (const room of Rooms){
        if(room.roomNo === roomNo){
            return room;
        }
    }

    return 'CanNotFindRoom';
};

function Room( gameMode, roomPlayerCount, player1, player2){
    this.gameMode = gameMode;
    this.player1 = player1;
    this.player2 = player2;
    this.roomPlayerCount = roomPlayerCount;
    this.roomNo = generateRoomNo();
    RoomNums.push(this.roomNo);

};

const createRoom = function (data) {
    const socket = this;

    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let roomCreater = (global.namelist)[index];
    let roomCreaterName = roomCreater.name;
    let roomCreaterID = roomCreater.socketID;


    let myRoom = new Room(data.gameMode,1, roomCreaterName)
    Rooms.push(myRoom);
    console.log('Current rooms:');
    console.log(Rooms);

    socket.join(myRoom.roomNo); //join room

    socket.emit('roomCreated', {myRoom})
};

const giveRoomInfo = function () {
    const socket = this;

    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let user = (global.namelist)[index];
    let myName = user.name;

    let myRoom = findMyRoomByName(myName);
    
    socket.emit('giveRoomInfo', {myRoom})
};

const leaveRoom = function() {
    const socket = this;
    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let user = (global.namelist)[index];
    let myName = user.name;
    let myRoom = findMyRoomByName(myName)

    if (myRoom.roomPlayerCount === 1){
        Rooms.pop(myRoom)
    } else {
        for (const room of Rooms){
            if(room.player1 === myName){
                room.roomPlayerCount -= 1;
                let temp = room.player2;
                room.player1 = temp;
                room.player2 = undefined;
            } else if (room.player2 === myName){
                room.roomPlayerCount -= 1;
                room.player2 = undefined;
            }
        }

    }

    console.log('Current rooms:');
    console.log(Rooms);

    socket.to(myRoom.roomNo).emit("updateRoomInfo", {myRoom});
}

const joinGameRoom = function(data) {
    const socket = this;

    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let user = (global.namelist)[index];
    let myName = user.name;

    let tryRoom = findMyRoomByRoomNo(data.roomToJoin);

    if(tryRoom === 'CanNotFindRoom'){
        socket.emit('canNotFindRoom');
    } else socket.emit('roomFound');


    for (const room of Rooms){
        if(room.roomNo === data.roomToJoin){
            room.player2 = myName;
            room.roomPlayerCount += 1;
        } 
    }

    console.log('Current rooms:');
    console.log(Rooms);

    let myRoom = findMyRoomByName(myName);

    socket.join(myRoom.roomNo); //join room

    socket.to(myRoom.roomNo).emit("updateRoomInfo", {myRoom});
}

const startGame = function() {
    const socket = this;

    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let user = (global.namelist)[index];
    let myName = user.name;
    let myRoom = findMyRoomByName(myName)

    socket.emit('goToGame')
    socket.to(myRoom.roomNo).emit("goToGame");


}

module.exports = { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame, Rooms };