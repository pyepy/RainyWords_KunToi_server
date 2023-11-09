const { wordlist } = require('../utils/wordlist.js');
const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist } = require('../utils/serverdata.js');
const { selectMode, selectPowerUp, selectFlood, selectRain } = require('../utils/gamemode.js')

const randomLength = function (mode) {    //get random length of word
  var rnd = Math.random();
  const gm = selectMode(mode);
  let len = gm(rnd);
  //console.log(rnd ,len);
  return len;
};

const randomPowerUp = function (mode,len) {    //get random length of word
  var rnd = Math.random();
  const pw = selectPowerUp(mode);
  return pw(rnd,len);
};

const randomFlood = function (mode,len) {
  var rnd = Math.random();
  const pw = selectFlood(mode);
  return pw(rnd,len);
}

const randomRain = function (mode,len) {
  var rnd = Math.random();
  const pw = selectRain(mode);
  return pw(rnd,len);
}

const randomWord = function (mode) {     //assign random word to each player
  const socket = this;
  let len = randomLength(mode)
  let size = Object.values(wordlist)[len-2].length;
  let pos = Math.floor(Math.random()*size);
  let word = wordlist[len][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  let powerUp = randomPowerUp(mode,len)
  console.log("word generated: ",word,len,`${pos}/${size}`,powerUp);
  io.in(room).emit("send_word", {len,word,powerUp})
};

const randomWordFixedLength = function (data) {     //assign random word to each player
  const socket = this;
  var size = Object.values(wordlist)[data.len-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[data.len][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  let powerUp = randomRain(data.mode,data.len)
  console.log("easyword generated: ",word,data.len,`${pos}/${size}`,powerUp);
  socket.emit("send_word", {"len":data.len,word,powerUp})
};

const fixedLentoEnemy = function (data) {
  const socket = this;
  var size = Object.values(wordlist)[data.len-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[data.len][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  let powerUp = randomFlood(data.mode,data.len)
  console.log("enemy generated: ",word,data.len,`${pos}/${size}`,powerUp);
  socket.in(room).emit("send_word", {"len":data.len,word,powerUp})
};

module.exports = { randomWord, randomWordFixedLength, fixedLentoEnemy }