const { io, socket } = require('../utils/socket-server.js')

const playerConnect = function (socket) {
  global.count = global.count + 1;
  console.log(`${count}) USER CONNECTED: ${socket.id}`);
  io.emit("online_no", global.count);
  socket.on("disconnect", playerDisconnect);
 }

const playerDisconnect = function () {    // subtract 1 to counter
  const socket = this;
  global.count = global.count - 1;
  console.log(`${count}] USER DISCONNECTED: ${socket.id}`);
  io.emit("online_no", global.count);
  let index = (global.namelist).findIndex(user => user.socketID == socket.id)   //find index of disconnected id
  global.namelist.splice(index,1)     //remove disconnected id
  console.log(namelist)
}
  
module.exports = {
  playerConnect,
}

