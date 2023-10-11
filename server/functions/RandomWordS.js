const { wordlist } = require('../utils/wordlist.js');
const { io } = require('../utils/socket-server.js')

var len;
var word;

const EasyMode = function (rnd) {   //assign prob. for easy mode
  if (rnd < 0.1) {return(3)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(4)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(5)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(6)}
  else {return(7)};
}

const MediumMode = function (rnd) {   //assign prob. for medium mode
  if (rnd < 0.1) {return(6)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(7)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(8)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(9)}
  else {return(10)};
}

const HardMode = function (rnd) {   //assign prob. for hard mode
  if (rnd < 0.1) {return(9)}
  else if (rnd >= 0.1 && rnd < 0.3) {return(10)}
  else if (rnd >= 0.3 && rnd < 0.7) {return(11)}
  else if (rnd >= 0.7 && rnd < 0.9) {return(12)}
  else {return(13)};
}

const RandomLength = function (mode) {    //get random length of word
  var rnd = Math.random();
  if (mode == 2) {
    len = MediumMode(rnd);
  } else if (mode == 3) {
    len = HardMode(rnd);
  } else {
      len = EasyMode(rnd);
  }
  console.log(rnd ,len);
  io.emit("send_len", len);
};

const RandomWord = function (len) {     //assign random word to each player
  const socket = this;
  var size = Object.values(wordlist)[len-2].length;
  var pos = Math.floor(Math.random()*size);
  word = wordlist[len][pos];
  socket.emit("send_word", {len,word})
};

module.exports = { RandomLength, RandomWord }