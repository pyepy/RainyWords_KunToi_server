const blindEnemy = function () {
  const socket = this;
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  socket.in(room).emit("blind_enemy")
}

module.exports = { blindEnemy }