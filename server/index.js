const { io, server } = require('./utils/socket-server.js')
const { instrument } = require("@socket.io/admin-ui");
const { getNamelist, getRoomlist } = require('./utils/serverdata')

const { sendMessage, joinRoom } = require('./functions/SendMessageS.js');
const { playerConnect, playerDisconnect, sendNo } = require('./functions/PlayerCountS.js');
const { randomWord, randomWordFixedLength, fixedLentoEnemy } = require('./functions/RandomWordS.js')
const { blindEnemy, floodEnemy } = require('./functions/PowerUp.js')
const { trackTime } = require('./functions/GameTimerS.js')
const { createName } = require('./functions/AddUsernameS.js')
const { addScore,subtractScore } = require('./functions/ScoreTrackerS.js')
const { endScore, backHome, backToLobby } = require('./functions/EndScreenS.js')
const { createRoom, giveRoomInfo, leaveRoom, joinGameRoom, startGame, sendLobbyMessage, updateSetting } = require('./functions/Lobby.js')


const { nukeServer, checkNamelist, checkRoomlist } = require('./functions/AdminPower.js')

instrument(io, {    //admin check
    auth: false,
  });

io.on("connection", (socket) => {
    //AddNametoDB
    socket.once("assign_name",createName);

    //Count
    socket.once("assign_name",playerConnect);
    socket.on("req_online_no", sendNo);
    socket.on("disconnect", playerDisconnect);

    //RandomWord     
    socket.on("request_word", randomWord);
    //GamePlay
    socket.on("req_blind", blindEnemy)
    socket.on("req_flood_enemy", floodEnemy)
    socket.on("req_word_fixed_len", randomWordFixedLength);
    socket.on("req_flood_word", fixedLentoEnemy)
    

    //SendMessage
    socket.on("join_room", joinRoom);
    socket.on("send_message", sendMessage);

    //lobby chat
    socket.on("send_lobby_message", sendLobbyMessage);

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
    
    //UpdateScore
    socket.on("req_success", addScore);
    socket.on("req_fail", subtractScore);

    //Endgame
    socket.on("game_leaderboard", endScore);
    socket.on("reset_user", backHome);
    socket.on("play_again", backToLobby);

    socket.on("update_setting", updateSetting)

    //Admin
    socket.on("prepare_nuke", nukeServer);
    socket.on("checkname", checkNamelist);
    socket.on("checkroom", checkRoomlist);
});

//io.on("connection", playerConnect)      //playerCounter

//io.of('/admin').on("connection", adminConnect)

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")    //when run node index.js server, return text
});

