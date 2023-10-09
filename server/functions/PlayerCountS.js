const { io } = require('./socket-server.js')

const playerConnect = function () {   // add 1 to counter
  const socket = this;
  global.count = global.count + 1;
  console.log(`USER CONNECTED: ${socket.id}`);
  io.emit("online_no", global.count);
 }

const playerDisconnect = function () {    // subtract 1 to counter
  const socket = this;
  global.count = global.count - 1;
  console.log(`USER DISCONNECTED: ${socket.id}`);
  io.emit("online_no", global.count);
}
  
module.exports = {
  playerConnect,
  playerDisconnect
}

