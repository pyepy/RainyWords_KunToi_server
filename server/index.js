const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect, playerDisconnect } = require('./functions/PlayerCountS.js');
const { randomWord, randomWordFixedLength } = require('./functions/RandomWordS.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName } = require('./functions/AddUsernameS.js')
const { updateScore } = require('./functions/ScoreTrackerS.js')
const { endScore, backHome, backToLobby } = require('./functions/EndScreenS.js')
const { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame } = require('./functions/Lobby.js')

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", (socket) => {
    //AddNametoDB
    socket.once("assign_name",createName);

    //RandomWord     
    socket.on("request_word", randomWord);
    socket.on("req_word_fixed_len", randomWordFixedLength);

    //SendMessage
    socket.on("join_room", joinRoom);
    socket.on("send_message", sendMessage);

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

    //Blind enemy
    socket.on("activate_blind_powerup", () => {
        // Broadcast the "blind" power-up activation to all connected clients except the sender
        socket.broadcast.emit("blind_powerup_activated");

        // Handle the "blind" effect for the sender
        // Add your logic here to make the sender's sketch display the black box
    });
    //Blind enemy
    socket.on("activate_flood_enemy", () => {
        // Broadcast the "blind" power-up activation to all connected clients except the sender
        socket.broadcast.emit("flood_enemy_activated");

        // Handle the "blind" effect for the sender
        // Add your logic here to make the sender's sketch display the black box
    });


    //UpdateScore
    socket.on("req_update_score", updateScore)

    //Endgame
    socket.on("game_leaderboard", endScore)
    socket.on("reset_user", backHome)
    socket.on("play_again", backToLobby)
});

io.on("connection", playerConnect)      //playerCounter

var lobby = io.of('/play');

lobby.on("connection", (socket) => {
    //SelectRoom
    
});

var game = io.of('/game/');

game.on("connection", (socket) => {
    //RandomWord     
    //socket.on("request_len", randomLength);
    //socket.on("request_word", randomWord);

    //updateScore
    socket.on("update_score", updateScore)
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

