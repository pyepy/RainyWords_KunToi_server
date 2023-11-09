const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, getRoombyRoomNO } = require('../utils/serverdata.js');
const { baseAdd, baseSubtract, multiplier, nWord } = require('../utils/gamemode.js') 

const add = function (len,t,power,mode) {
  let p = 1
  if (power == "nword") {
    p = -(nWord[mode]);
  } else if (t <= 5) {
    p = baseAdd[len] + multiplier[len]*(5-t);
  } else {
    p = baseAdd[len];
  }
  return p;
}

const sub = function (len,power) {
  if (power == "nword") {
    return 0;
  }
  let p = baseSubtract[len]
  return -p;
}

const addScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  let namelist = getNamelist();
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  let roomInfo = getRoombyRoomNO(currentRoom);
  if (data.noChange == true){
    console.log("update score",socket.id)
    namelist = namelist.filter((user) => user.room == currentRoom);
    io.to(currentRoom).emit("send_score", {namelist});
    return;
  }
  let pts = add(data.len,data.diffTime,data.powerUp,roomInfo.wordDifficulty);
  updateUserInfo(pts,index,"score");
  //console.log("success: ",data.word,data.len,data.diffTime,data.powerUp,pts)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

const subtractScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  let pts = sub(data.len,data.powerUp);
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  //console.log("fail: ",data.word,data.len,data.powerUp,pts)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

module.exports = { addScore, subtractScore }