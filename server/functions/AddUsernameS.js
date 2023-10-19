var name = "";
var info = {'socketID':'', 'name':'', 'score':0};

const createName = function (data) {
  const socket = this;
  if (data === "") {
    var x = (Math.floor(Math.random() * 900)+100)   //assign random ID
    name = "KunToi#"+x;      //default name                   
  } else {
    name = data;
  }
  let i = (global.namelist).findIndex(user => user.name == name)
  while (i != -1) {
    var x = (Math.floor(Math.random() * 900)+100)   //assign random ID
    name = "KunToi#"+x;
    i = (global.namelist).findIndex(user => user.name == name)
  }

  info = {'socketID':socket.id, 'name':name, 'score':0};
  let index = (global.namelist).findIndex(user => user.socketID == socket.id)   //find index of disconnected id
  //console.log(index)
  if (index != -1) {
    global.namelist.splice(index,1)
  };
  (global.namelist).push(info);
  console.log(namelist);
  socket.emit("ack_name",{name,namelist})
}

const loginState = function (data) {
  const socket = this;
  let index = (global.namelist).findIndex(user => user.socketID == socket.id);   //find index of disconnected id
  let user = (global.namelist)[index];
  let login = 0;
  let name = ""
  if (index != -1) {
    login = 1;
    name = user.name
  };
  //console.log(index, login, info.name,name)
  socket.emit("ack_login",{login,name})
  //console.log("sent")
}




module.exports = { createName, loginState, info };