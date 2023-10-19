const pts = 0;
const b1 = [];    //len: 2-15
const b2 = [];

const updateScore = function (data) {       //data = {len,difftime,powerup}
  const socket = this;;
  let addPts = 1;        // 1 point for 1 word
  //let pts = b1[len-2] + (b2[len-2]/difftime+1)  some function for the point system
  pts = pts + addPts;
  let index = (global.namelist).findIndex(user => user.socketID == socket.id);
  (global.namelist)[index].score = pts;
  socket.emit("send_score",{score})
}

/*const UpdateIndex = function () {
  const socket = this;
  index = (global.namelist).findIndex(user => user.socketID == socket.id);
}*/

module.exports = { updateScore }