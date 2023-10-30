const { wordlist } = require('../utils/wordlist.js');
const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist } = require('../utils/serverdata.js');

var len;
var word;

const easyMode = function (rnd) {   //assign prob. for easy mode
  if (rnd < 0.1) {return(3)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(4)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(5)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(6)}
  else {return(7)};
}

const mediumMode = function (rnd) {   //assign prob. for medium mode
  if (rnd < 0.1) {return(6)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(7)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(8)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(9)}
  else {return(10)};
}

const hardMode = function (rnd) {   //assign prob. for hard mode
  if (rnd < 0.1) {return(9)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(10)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(11)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(12)}
  else {return(13)};
}

const randomLength = function (mode) {    //get random length of word
  var rnd = Math.random();
  if (mode == 2) {
    len = mediumMode(rnd);
  } else if (mode == 3) {
    len = hardMode(rnd);
  } else {
      len = easyMode(rnd);
  }
  //console.log(rnd ,len);
  return len;
};

const randomWord = function (mode) {     //assign random word to each player
  const socket = this;
  let len = randomLength(mode)
  var size = Object.values(wordlist)[len-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[len][pos];
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