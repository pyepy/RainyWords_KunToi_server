const { getCount, addCount, removeCount, getRoomNumbers } = require('../utils/serverdata.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { getRoomlist, getRoombyRoomNO, updateRoomlist, removeRoomlist, addRoomlist, amIRoomHead, resetRoomlist } = require('../utils/serverdata.js');
const { io } = require('../utils/socket-server.js');

function theGreatReset () {
  const socket = this;
  resetRoomlist();
  let namelist = getNamelist();
  for (let i = 0; i < namelist.length; i++) {
    updateUserInfo(0,i,"reset_all");
  }
  console.log("resetoooeotisojldjkl;koiugfdn")
  console.log(getNamelist())
  console.log("roomlist, roomnum")
  console.log(getRoomlist(), getRoomNumbers())
  io.except(socket.id).emit("nuke_incoming")
}

function nukeServer () {
  const socket = this;
  console.log("preparing nukasde");
  io.except(socket.id).emit("nuke_launched");
  io.socketsLeave(getRoomNumbers())
  const reset = setTimeout(theGreatReset,500);
}

function checkNamelist () {
  const socket = this;
  let msg = getNamelist();
  console.log(msg);
  socket.emit("admin_log",msg)
}

function checkRoomlist () {
  const socket = this;
  let msg = getRoomlist();
  console.log(msg);
  socket.emit("admin_log",msg)

}

module.exports = { nukeServer, checkNamelist, checkRoomlist }