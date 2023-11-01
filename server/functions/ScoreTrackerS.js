const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { baseAdd, baseSubtract, multiplier } = require('../utils/gamemode.js') 

const add = function (len,t) {
  //let p = 1;          // 1 point for 1 word
  //let p = baseAdd[len]
  let p = 1
  if (t <= 5) {
    p = baseAdd[len] + multiplier[len]*(5-t);
  } else {
    p = baseAdd[len];
  }
  return p;
}

const sub = function (len) {
  //let p = 1
  let p = baseSubtract[len]
  return -p;
}

const addScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  if (data.noChange == true){
    let namelist = getNamelist();
    let currentRoom = getSpecificInfo(index,"room");
    console.log("update score",socket.id)
    namelist = namelist.filter((user) => user.room == currentRoom);
    io.to(currentRoom).emit("send_score", {namelist});
    return ;
  }
  console.log(data)
  let pts = add(data.len,data.diffTime);
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  console.log("success score",socket.id,data.word,data.len,data.diffTime)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

const subtractScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;
  console.log(data)
  let l = (data.word).length;
  let pts = sub(l);
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  console.log("fail score",socket.id)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

module.exports = { addScore, subtractScore }