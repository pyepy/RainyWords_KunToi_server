const { getNamelist, addNamelist, removeNamelist, findNameIndex } = require('../utils/serverdata.js');

var name = "";

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
    var x = (Math.floor(Math.random() * 900)+100)   //assign random ID
    name = "KunToi#"+x;
    i = findNameIndex(name,"name") 
  }

  let info = {'socketID':socket.id, 'name':name, 'score':0, 'room':""};
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