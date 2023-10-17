const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect } = require('./functions/PlayerCountS.js');
const { randomLength, randomWord } = require('./functions/RandomWordS.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName, loginState } = require('./functions/AddUsernameS.js')
const { selectLobby } = require('./functions/SelectLobbyS.js')
const { updateScore } = require('./functions/ScoreTrackerS.js')

global.count = 0;   //for PlayerCounter
global.namelist = [];
global.roomlist = []

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", playerConnect)      //playerCounter

io.on("connection", (socket) => {
    //AddNametoDB
    socket.on("req_login",loginState)
    socket.once("assign_name",createName);

    //SendMessage
    socket.on("join_room", joinRoom);
    socket.on("send_message", sendMessage);
    
    //RandomWord
    socket.on("request_len", randomLength);
    socket.on("request_word", randomWord);

    //Start/StopTimer
    socket.on("mess_with_time", trackTime)
});

var lobby = io.of('/play');
/*
lobby.on("connection", (socket) => {
    //SelectRoom
    socket.on("select_lobby", selectLobby)
});
*/
var game = io.of('/game');

game.on("connection", (socket) => {
    //updateScore
    socket.on("update_score", updateScore)
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

