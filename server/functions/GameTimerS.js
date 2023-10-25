const { io } = require('../utils/socket-server.js')

const fixedTime = 300      //set default timer
var timer = fixedTime;

const interval = 1000;

const trackTime = function (data) {
  if (data == 'hi') {     //start timer
    time = setInterval(() => {
    //console.log('hi');
    let min = Math.floor(timer / 60)
    let sec = timer % 60
    io.emit('counter', {min,sec});
    //console.log(min)
    //console.log(sec)
    if (timer <= 0) {     //check time's up
      //console.log("last one")
      clearInterval(time);
      min = Math.floor(fixedTime / 60)
      sec = fixedTime % 60
      setTimeout(function () {io.emit('counter', {min,sec})}, 1000);
      timer = fixedTime + 1 
    }
    timer--
  }, interval);
  } else if (data == 'bye') {   //pause timer
    //console.log('stop')
    clearInterval(time);
  } else if (data == 'no') {    //reset timer
    clearInterval(time);
    let min = Math.floor(fixedTime / 60)
    let sec = fixedTime % 60
    io.emit('counter', {min,sec});
  }
}

module.exports = { trackTime };