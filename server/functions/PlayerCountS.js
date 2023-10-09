/**module.exports = (io,) => {*/

//unused

var count = 0;

const playerConnect = function () {
  const socket = this;
  console.log(`USER CONNECTED: ${socket.id}`);
  io.emit("online_no", count);
 }

const playerDisconnect = function () {
  const socket = this;
  console.log(`USER DISCONNECTED: ${socket.id}`);
  io.emit("online_no", count);
}
  /*return(
  playerConnect,
  playerDisconnect
)*/

  //}


/*io.once("connection", (socket) => {
  console.log(`${++count}) USER CONNECTED: ${socket.id}`);
  io.emit("online_no", count);

  socket.on("disconnect", playerDisconnect);
});
*/
module.exports = {
  playerConnect,
  playerDisconnect
}
///*}*/


    

  
