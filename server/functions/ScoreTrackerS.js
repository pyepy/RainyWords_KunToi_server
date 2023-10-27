const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { baseScore } = require('../utils/gamemode.js') 

const b1 = baseScore;    //len: 2-15
const b2 = [];

const addScore = function (len) {
  //let p = 1;          // 1 point for 1 word
  let p = baseScore[len]
  console.log(baseScore)
  console.log(len)
  //let p = b1[len-2] + (b2[len-2]/difftime+1)  some function for the point system
  return p;
}

const removeScore = function () {
  let p = -1
  //let p = b1[len-2]
  return p;
}

const updateScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  console.log(data)
  let l = (data.word).length;
  let pts = addScore(l);
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  console.log("update score",socket.id)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

module.exports = { updateScore }