const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect } = require('./functions/PlayerCountS.js');
const { randomLength, randomWord } = require('./functions/RandomWordS.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName } = require('./functions/AddUsernameS.js')
const { selectLobby } = require('./functions/SelectLobbyS.js')
const { updateScore } = require('./functions/ScoreTrackerS.js')

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

var lobby = io.of('/play');

lobby.on("connection", (socket) => {
    //SelectRoom
    socket.on("select_lobby", selectLobby)
});

var game = io.of('/game');

game.on("connection", (socket) => {
    //updateScore
    socket.on("update_score", updateScore)
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

