//join & create lobby
//leave lobby
//player tracker
const { io } = require('../utils/socket-server.js')
const { info } = require('../functions/AddUsernameS.js')

const lobby = io.of('/play');
var roomsize = 0;

const createLobby = function (data) {
  const socket = this;
  let room = data.mode + (Math.floor(Math.random()*900)+100)
  socket.join(room)
  socket.emit("rcv_lobby",{room})
}

const joinLobby = function (data) {
  const socket = this;
  socket.join(data.room)
  socket.emit("rcv_lobby",data.room)
  socket.to(data.room).emit("rcv_msg",`-- ${info.name} has joined room: ${data.room}`)
}

const leaveLobby = function (data) {
  const socket = this;
  socket.leave(data.oldRoom);
  socket.emit("rcv_lobby",{room:""})
  socket.to(data.room).emit("rcv_msg",`-- ${info.name} has left room: ${data.room}`)
}

const sendMessage = function (data) {
  const socket = this;
  socket.to(data.room).emit("rcv_msg", data.message);
};

/*const roomCount = function (data) {
  const socket = this;
  console.log(roomsize);
  console.log(`Online Players in room ${data.room}: ${roomsize}`);
  io.of('/play').to(data.room).emit("room_count", {roomsize});
}*/

module.exports = { createLobby, joinLobby, leaveLobby }