const { io } = require('../utils/socket-server.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');

const endScore = function (data) {
  const socket = this;
  let namelist = getNamelist();
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  console.log("hiashdksdjhjb",namelist)
  //namelist = namelist.filter((user) => user.room == currentRoom);
  io.emit("final_score", {namelist});
}

const resetUser = function () {
  const socket = this;
  let index = findNameIndex(socket.id,"id");
  let currentRoom = getSpecificInfo(index,"room");
  updateUserInfo(currentRoom,index,"reset");
  //socket.leave(currentRoom)
  //console.log(getNamelist())
  console.log("resetoooo")
}


module.exports = { endScore, resetUser };