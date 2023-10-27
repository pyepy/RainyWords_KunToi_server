const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { getRoomlist, getRoombyRoomNO, updateRoomlist, removeRoomlist, addRoomlist, amIRoomHead } = require('../utils/serverdata.js')

const endScore = function () {
  const socket = this;
  let namelist = getNamelist();
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  console.log("hiashdksdjhjb",namelist)
  //namelist = namelist.filter((user) => user.room == currentRoom);
  io.emit("final_score", {namelist});
}

const backHome = function () {
  const socket = this;
  let namelist = getNamelist();
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  let roomObj = getRoombyRoomNO(currentRoom)
  for (let i = 0; i < namelist.length; i++) {
    let user = namelist[i];
    if (user.room == currentRoom) {
      updateUserInfo(currentRoom,i,"reset");
    }
  }
  io.in(currentRoom).emit("forced_kick");
  io.in(currentRoom).socketsLeave(currentRoom);
  removeRoomlist(roomObj);
  console.log(getNamelist())
  console.log("resetoooo")
}

const backToLobby = function () {
  const socket = this;
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  io.in(currentRoom).emit("forced_to_lobby")
}

module.exports = { endScore, backHome, backToLobby };