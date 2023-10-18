const { io } = require('../utils/socket-server.js')

let Rooms = []

function generateRoomNo() {
    const number = '1234567890';
    let result = '';
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * number.length);
      result += number.charAt(randomIndex);
    }

    if (!(Rooms.includes(result))){
        return result;
    } else{
        return generateRoomNo();
    }

    
  }

function Room( gameMode, player1, player2, roomNo = '00000'){
    this.gameMode = gameMode;
    this.player1 = player1;
    this.player2 = player2;
    this.roomNo = generateRoomNo();
    Rooms.push(this.roomNo);


};

const createRoom = function (data) {
    const socket = this;
    console.log(data.gameMode);

    let index = (global.namelist).findIndex(user => user.socketID == socket.id);
    let roomCreater = (global.namelist)[index];
    let roomCreaterName = roomCreater.name;
    let roomCreaterID = roomCreater.socketID;


    let myRoom = new Room(data.gameMode, roomCreaterName)
    console.log(myRoom);

    socket.join(myRoom.roomNo); //join room

    socket.emit('roomCreated', {myRoom})
};

const giveRoomInfo = function (data) {
    const socket = this;

    socket.emit('giveRoomInfo', {Rooms})
};

module.exports = { createRoom, giveRoomInfo, Rooms };