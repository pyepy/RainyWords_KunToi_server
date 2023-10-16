const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect } = require('./functions/PlayerCountS.js');
const { RandomLength, RandomWord } = require('./functions/RandomWordS.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName } = require('./functions/AddUsernameS.js')
const { SelectLobby } = require('./functions/SelectLobbyS.js')

global.count = 0;   //for PlayerCounter
global.namelist = [];

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", playerConnect)      //playerCounter

io.on("connection", (socket) => {
    //AddNametoDB
    socket.on("assign_name",createName);

    //SendMessage
    socket.on("join_room", joinRoom);
    socket.on("send_message", sendMessage);
    
    //RandomWord
    socket.on("request_len", RandomLength);
    socket.on("request_word", RandomWord);

    //Start/StopTimer
    socket.on("mess_with_time", trackTime)
});

const lobby = io.of('/play');

lobby.on("connection", (socket) => {
    socket.on("select_lobby", SelectLobby)



});



server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

