//declare all server-wide var here
//const { getCount, addCount, removeCount } = require('../utils/serverdata.js');
//const { getNamelist, getUserInfo, getSpecificInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');
//const { getRoomlist, getRoomNumbers, getRoombyRoomNO, updateRoomlist, removeRoomlist, addRoomlist, amIRoomHead, resetRoomlist } = require('../utils/serverdata.js')


var count = 0;
var namelist = [];
var roomlist = [];
var roomNumbers = []

//count
exports.addCount = function () {
  count = count + 1;
  //console.log(count)
};

exports.removeCount = function () {
  count = count - 1;
  //console.log(count)
};

exports.getCount = function () {
  return count;
}

//namelist
exports.addNamelist = function (x) { 
  namelist.push(x);
  console.log(namelist);
};

exports.removeNamelist = function (i) {   
  namelist.splice(i,1)     
  //console.log(namelist)
};

exports.findNameIndex = function (value,mode) {
  if (mode == "id"){
    return namelist.findIndex(user => user.socketID == value)
  } else if (mode = "name") {
    return namelist.findIndex(user => user.name == value)
  } 
}

exports.getNamelist = function () {
  return namelist;
}

exports.getUserInfo = function (i) {
  return namelist[i];
}

exports.getSpecificInfo = function (i,mode) {
  if (i != -1) {
    if (mode == "room") {
      return namelist[i].room;
    }
  }
}

exports.updateUserInfo = function (value, i, mode) {
  if (i != -1) {
    let user = namelist[i]
  //console.log(user,namelist)
  if (mode == "room") {
    user.room = value;
    console.log(namelist);
  } else if (mode == "score") {
    user.score += value;
  } else if (mode == "reset") {
    user.score = 0;
  } else if (mode == "reset_all") {
    user.score = 0;
    user.room = '';
  }
  }
}

//roomlist
exports.addRoomlist = function (room) {
  roomlist.push(room);
  roomNumbers.push(room.roomNo);
  console.log('Current rooms (create): -------------------------------');
  console.log(roomlist);
  console.log('-------------------------------------------------------');
}

exports.removeRoomlist = function (room) {
  const index = roomlist.indexOf(room);
  console.log(index, "removeplz")
  if (index !== -1) {
    roomlist.splice(index, 1);
    roomNumbers.splice(index, 1);
  }
  console.log('Current rooms (removed): -------------------------------');
  console.log(roomlist);
  console.log('--------------------------------------------------------');
}

exports.updateRoomlist = (room) => {
  for (var listroom of roomlist){
    if(listroom.roomNo === (room.roomNo) ){
        listroom = room;
    }
  }
  console.log('Current rooms (updated): -------------------------------');
  console.log(roomlist);
  console.log('--------------------------------------------------------');
}

exports.amIRoomHead = (myName) => {
  for (const room of roomlist){
    if(room.players.includes(myName)) {
      let index = room.players.indexOf(myName);
      if(index === 0) return true;
    }
  }
  return false;
}

exports.getRoomlist = function () {
  return roomlist;
}

exports.getRoomNumbers = function () {
  return roomNumbers;
}

exports.getRoombyRoomNO = function (no) {
  const index = roomlist.findIndex(room => room.roomNo == no);
  if (index != -1) {
    return roomlist[index];
  }
}

exports.resetRoomlist = function () {
  for (let i = 0; i < roomlist.length; i++) {
    let room = roomlist[0];
    if (room.gameTime !== -1) {
      clearInterval(room.gameTime);
      room.gameTime = -1;
    }
    roomlist.splice(0, 1);
    roomNumbers.splice(0, 1);
  }
}