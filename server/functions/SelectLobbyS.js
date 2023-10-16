//join & create lobby
//leave lobby
//player tracker
const { io } = require('../utils/socket-server.js')

const socket = this;
var roomsize = 0;

const SelectLobby = function (data) {
  var roomsize = io.of('/play').sockets.size;
  socket.leave(data.oldRoom);     //leave old room
  console.log(`-- ${socket.id} is now disconnected from room: ${data.oldRoom}`);
  console.log(`-- ${socket.id} is now connected to room: ${data.room}`);
  socket.join(data.room);
  socket.emit("ack_lobby", {room,roomsize});  //emit event ack_room
};

const RoomCount = function (data) {
  console.log(roomsize);
  console.log(`Online Players in room ${data.room}: ${roomsize}`);
  io.of('/play').to(data.room).emit("room_count", {roomsize});
  console.log('SDf')
  
}

module.exports = { SelectLobby, RoomCount }