const { getCount, addCount, removeCount } = require('../utils/serverdata.js');
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
const { getRoomlist, getRoomNumbers, getRoombyRoomNO, updateRoomlist, removeRoomlist, addRoomlist, amIRoomHead, resetRoomlist } = require('../utils/serverdata.js')



const blindEnemy = function () {
  const socket = this;
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  socket.in(room).emit("blind_enemy");
}

module.exports = { blindEnemy }