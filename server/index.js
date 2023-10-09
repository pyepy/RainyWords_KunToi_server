const { io, server } = require('./functions/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect, playerDisconnect } = require('./functions/PlayerCountS.js');
const { RandomLength, RandomWord } = require('./functions/RandomWordS.js')

global.count = 0;   //for PlayerCounter

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", (socket) => {
    //PlayerCount
    socket.once("connected", playerConnect)
    socket.on("disconnect", playerDisconnect)

    //SendMessage
    socket.on("join_room", joinRoom)
    socket.on("send_message", sendMessage)
    
    //RandomWord
    socket.on("request_len", RandomLength);
    socket.on("request_word", RandomWord);
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

