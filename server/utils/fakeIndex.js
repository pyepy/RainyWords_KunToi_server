import io from './socket-server'
import count from './serverdata.js'

let playerNo = count;
document.getElementById("count").innerHTML = playerNo;

function nukeServer () {
  //io.disconnectSockets();
  alert("hi!")
}




