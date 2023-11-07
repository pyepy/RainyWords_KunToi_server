const { io, socket } = require('../utils/socket-server.js');
/*var { count } = require('../utils/serverdata.js');*/
const { getCount, addCount, removeCount } = require('../utils/serverdata.js');
const { getNamelist, removeNamelist, findNameIndex } = require('../utils/serverdata.js');

/*const playerConnect = function (socket) {
  addCount();
  let count = getCount() - getAdminCount();
  console.log(`${count}) USER CONNECTED: ${socket.id}`);
  io.emit("online_no", count);
  socket.on("req_online_no", sendNo);
  socket.on("disconnect", playerDisconnect);
 }*/

const playerConnect = function () {
  const socket = this;
  addCount();
  let count = getCount();
  console.log(`${count}) USER CONNECTED: ${socket.id}`);
  io.emit("online_no", count);
}

const sendNo = function () {
  const socket = this;
  let count = getCount();
  socket.emit("online_no",count)
}

const playerDisconnect = function () {    // subtract 1 to counter
  const socket = this;
  let count = getCount();
  console.log(`${count}] USER DISCONNECTED: ${socket.id}`);
  let index = findNameIndex(socket.id,"id")   //find index of disconnected id
  if (index != -1) {
    setTimeout( function () {
    removeNamelist(index);     //remove disconnected id
    let namelist = getNamelist();
    console.log(namelist)
    },1);
    removeCount();
  }
  io.emit("online_no", count);
}
  
module.exports = {
  playerConnect,
  playerDisconnect, 
  sendNo
}

