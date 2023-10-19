const { getNamelist, addNamelist, removeNamelist, findNameIndex } = require('../utils/serverdata.js');

var name = "";

function userInfo(id,name,score,room) {
  this.socketID = id;
  this.name = name;
  this.score = score;
  this.room = room;
}

const createName = function (data) {
  const socket = this;
  if (data === "") {
    var x = ("000"+ Math.floor(Math.random() * 1000)).slice(-3)   //assign random ID
    name = "KunToi#"+x;      //default name                   
  } else {
    name = data;
  }
  let i = findNameIndex(name,"name") 
  while (i != -1) {
    var x = ("000"+ Math.floor(Math.random() * 1000)).slice(-3)  
    name = "KunToi#"+x;
    i = findNameIndex(name,"name") 
  }

  let info = new userInfo(socket.id,name,0,"");
  let index = findNameIndex(socket.id,"id")   //find index of disconnected id
  //console.log(index)
  if (index != -1) {
    removeNamelist(index); 
  };
  addNamelist(info);
  let namelist = getNamelist();
  socket.emit("ack_name",{name,namelist})
}

module.exports = { createName };