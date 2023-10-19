//declare all server-wide var here
//const { getCount, addCount, removeCount } = require('../utils/serverdata.js');
//const { getNamelist, getUserInfo, addNamelist, removeNamelist, findNameIndex, updateUserInfo } = require('../utils/serverdata.js');

var count = 0;
var namelist = [];
var roomlist = [];

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
  console.log(namelist)
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

exports.updateUserInfo = function (value, i, mode) {
  if (mode == "room") {
    namelist[i].room = value;
    console.log(namelist);
  }
}

//roomlist
exports.addRoomlist = function () {

}

exports.removeRoomlist = function () {
  
}

exports.getRoomlist = function () {
  return roomlist;
}