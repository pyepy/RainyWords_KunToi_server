const { io } = require('../utils/socket-server.js')
const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo, addRoomlist, removeRoomlist, updateRoomlist, getRoomlist, amIRoomHead } = require('../utils/serverdata.js');
const { endScore } = require('./EndScreenS.js');

//const fixedTime = 30;      //set default timer
////var timer = fixedTime;

//const interval = 1000;


const trackTime = function (data,myRoom,time) {
  const fixedTime = time;      //set default timer
  var timer = fixedTime;
  const interval = 1000;

  let room = myRoom.roomNo
  //if (data == 'hi' && headCheck) {     //start timer
  if (data == 'hi') {
    myRoom.gameTime = setInterval(() => {
    let min = Math.floor(timer / 60)
    let sec = timer % 60
    io.in(room).emit('counter', {min,sec});
    //console.log(min)
    console.log(sec,room)
    if (timer <= 0) {     //check time's up
      //console.log("last one")
      clearInterval(myRoom.gameTime);
      min = Math.floor(fixedTime / 60);
      sec = fixedTime % 60;
      timer = fixedTime + 1;
      myRoom.gameTime = -1
      io.in(room).emit('timesUp',room);
    }
    timer--
  }, interval);
  } else if (data == 'bye') {   //pause timer
    //console.log('stop')
    clearInterval(myRoom.gameTime);
  } else if (data == 'no') {    //reset timer
    clearInterval(myRoom.gameTime);
    let min = Math.floor(fixedTime / 60)
    let sec = fixedTime % 60
    myRoom.gameTime = -1
    io.in(room).emit('counter', {min,sec});
  }
}

module.exports = { trackTime };