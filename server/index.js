const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect } = require('./functions/PlayerCountS.js');
const { randomLength, randomWord } = require('./functions/RandomWordS.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName } = require('./functions/AddUsernameS.js')
const { updateScore } = require('./functions/ScoreTrackerS.js')
const { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame } = require('./functions/Lobby.js')

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", (socket) => {
    //AddNametoDB
    socket.once("assign_name",createName);

    //SendMessage
    socket.on("join_room", joinRoom);
    socket.on("send_message", sendMessage);

    //RandomWord
    socket.on("request_len", randomLength);
    socket.on("request_word", randomWord);

    //Start/StopTimer
    socket.on("mess_with_time", trackTime);

    //CreateRoom
    socket.on("request_create_room", createRoom);
    socket.on("request_room_info", giveRoomInfo);

    //JoinRoom
    socket.on("request_join_room", joinGameRoom);

    //leaveRoom
    socket.on("leave_room", leaveRoom);
    socket.on("disconnect", leaveRoom)

    //startGame
    socket.on("request_start_game", startGame);
});

io.on("connection", playerConnect)      //playerCounter

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

