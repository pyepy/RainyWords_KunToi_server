const { io,server } = require('./functions/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect, playerDisconnect } = require('./functions/PlayerCountS.js');
const { RandomLength, RandomWord } = require('./functions/RandomWordS.js')
const { wordlist } = require('./functions/wordlist.js')

const word = wordlist[15].length;
var count = 0;

instrument(io, {
    auth: false,
  });

io.on("connection", (socket) => {
    console.log(word);

    socket.once("connected", () => {
        console.log(`${++count}) USER CONNECTED: ${socket.id}`);
        io.emit("online_no", count);  
    });
    
    //socket.once("connected", playerConnect)
    socket.on("join_room", joinRoom)
    socket.on("send_message", sendMessage)
    //socket.on("disconnect", playerDisconnect)

    socket.on("request_len", RandomLength);
    socket.on("request_word", RandomWord);


    socket.on("disconnect", () => {
        console.log(`${--count}] USER DISCONNECTED: ${socket.id}`);
        io.emit("online_no", count);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

