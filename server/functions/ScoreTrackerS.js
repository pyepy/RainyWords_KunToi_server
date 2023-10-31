const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { baseAdd, baseSubtract } = require('../utils/gamemode.js') 

const b1 = baseAdd;    //len: 2-15
const b2 = [];

const add = function (len) {
  //let p = 1;          // 1 point for 1 word
  let p = baseAdd[len]
  //let p = b1[len-2] + (b2[len-2]/difftime+1)  some function for the point system
  return p;
}

const sub = function (len) {
  let p = 1
  //let p = baseSubtract[len]
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
  let l = (data.word).length;
  let pts = add(l);
  let index = findNameIndex(socket.id,"id");
  updateUserInfo(pts,index,"score");
  let namelist = getNamelist();
  let currentRoom = getSpecificInfo(index,"room");
  console.log("update score",socket.id)
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
  console.log("update score",socket.id)
  namelist = namelist.filter((user) => user.room == currentRoom);
  io.to(currentRoom).emit("send_score", {namelist});
}

module.exports = { addScore, subtractScore }