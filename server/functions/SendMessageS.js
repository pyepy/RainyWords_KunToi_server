const sendMessage = function (data) {
  const socket = this;
  socket.to(data.room).emit("receive_message", data);
};

const joinRoom = function (data) {
  const socket = this;
  socket.leave(data.oldRoom);     //leave old room
  console.log(`-- ${socket.id} is now disconnected from room: ${data.oldRoom}`)
  console.log(`-- ${socket.id} is now connected to room: ${data.room}`)
  socket.join(data.room);
  socket.emit("ack_room", data);  //emit event ack_room
};

module.exports = { sendMessage, joinRoom }
