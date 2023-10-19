
const fixedTime = 10      //set default timer
var timer = fixedTime;

const interval = 1000;

const countDown = function (data) {

  if (data == 'hi') {     //start timer
    time = setInterval(() => {
      let message = "Game starts in ... " + timer;
      io.emit('counter', {message});
      if (timer <= 0) {     //check time's up
        clearInterval(time);
        setTimeout(function () {io.emit('counter', {message})}, 1000);
        timer = fixedTime + 1;
      }
      timer--;
    }, interval);
  } else if (data == 'bye') {   //pause timer
    //console.log('stop')
    clearInterval(time);
  } else if (data == 'no') {    //reset timer
    clearInterval(time);
    let message = "Game starts in ... " + timer;
    io.emit('counter', {message});
    timer = fixedTime;
  }
}
