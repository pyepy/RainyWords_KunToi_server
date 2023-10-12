var name = "";

const createName = function (data) {
  const socket = this;
  if (data === "") {
    var x = (Math.floor(Math.random() * 900)+100)   //assign random ID
    name = "KunToi#"+x;      //default name                   
  } else {
    name = data;
  }
  let info = {'socketID':socket.id, 'name':name, 'score':0};
  (global.namelist).push(info);
  console.log(namelist);
  socket.emit("ack_name",{name,namelist})
}

module.exports = { createName };