const { wordlist } = require('../utils/wordlist.js');
const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist } = require('../utils/serverdata.js');
const { selectMode, selectPowerUp } = require('../utils/gamemode.js')

const randomLength = function (mode) {    //get random length of word
  var rnd = Math.random();
  const gm = selectMode(mode);
  let len = gm(rnd);
  //console.log(rnd ,len);
  return len;
};

const randomPowerUp = function (mode,len) {    //get random length of word
  var rnd = Math.random();
  const pw = selectPowerUp(mode,len);
  return pw(rnd);
};

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

const randomWordFixedLength = function (length) {     //assign random word to each player
  const socket = this;
  var size = Object.values(wordlist)[length-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[length][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  console.log("easyword generated: ",word,length,`${pos}/${size}`,"none");
  io.in(room).emit("send_word", {length,word,"powerUp":"none"})
};

const fixedLentoEnemy = function (length) {
  const socket = this;
  var size = Object.values(wordlist)[length-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[length][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  console.log("enemy generated: ",word,length/*,`${pos}/${size}`,"none"*/);
  socket.in(room).emit("send_word", {length,word,"powerUp":"none"})
};

module.exports = { randomWord, randomWordFixedLength, fixedLentoEnemy }