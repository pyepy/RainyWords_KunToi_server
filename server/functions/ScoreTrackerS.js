const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');


const b1 = [];    //len: 2-15
const b2 = [];

const addScore = function () {
  let p = 1;          // 1 point for 1 word
  //let p = b1[len-2] + (b2[len-2]/difftime+1)  some function for the point system
  return p;
}

const removeScore = function () {
  let p = 1
  //let p = b1[len-2]
  return -p;
}

const updateScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  let pts = addScore();
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  console.log(namelist)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.emit("send_score", {namelist});
  console.log({namelist});
  //socket.to(currentRoom).emit("send_score", namelist);
}

/*const UpdateIndex = function () {
  const socket = this;
  index = (global.namelist).findIndex(user => user.socketID == socket.id);
}*/

module.exports = { updateScore }