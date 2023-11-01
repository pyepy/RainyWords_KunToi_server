const { wordlist } = require('../utils/wordlist.js');
const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist } = require('../utils/serverdata.js');
const { selectMode } = require('../utils/gamemode.js')

const randomLength = function (mode) {    //get random length of word
  var rnd = Math.random();
  const gm = selectMode(mode);
  let len = gm(rnd);
  //console.log(rnd ,len);
  return len;
};

const randomWord = function (mode) {     //assign random word to each player
  const socket = this;
  let len = randomLength(mode)
  let size = Object.values(wordlist)[len-2].length;
  let pos = Math.floor(Math.random()*size);
  let word = wordlist[len][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  io.in(room).emit("send_word", {len,word})
};

const randomWordFixedLength = function (length) {     //assign random word to each player
  const socket = this;
  let len = length;
  var size = Object.values(wordlist)[len-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[len][pos];
  let index = findNameIndex(socket.id,"id");
  let room = getSpecificInfo(index,"room");
  io.in(room).emit("send_word", {len,word})
};

module.exports = { randomWord, randomWordFixedLength }