const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist, amIRoomHead } = require('../utils/serverdata.js');
const { endScore } = require('./EndScreenS.js');

const fixedTime = 30;      //set default timer
var timer = fixedTime;

const interval = 1000;

const trackTime = function (data) {
  // const socket = this;
  // let myIndex = findNameIndex(socket.id,"id");
  // let user = getUserInfo(myIndex);
  // let headCheck = amIRoomHead(user.name)
  // console.log(headCheck);
  //if (data == 'hi' && headCheck) {     //start timer
  if (data == 'hi' ) {
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
      min = Math.floor(fixedTime / 60);
      sec = fixedTime % 60;
      timer = fixedTime + 1;
      io.emit('timesUp');
        
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