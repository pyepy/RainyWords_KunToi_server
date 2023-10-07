const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

var count = 0;
var namelist =[];

io.on("connection", (socket) => {
    count++;
    console.log(`${count}) USER CONNECTED: ${socket.id}`);
    io.emit("online_no", count);

    socket.on("join_room", (data) => {
        socket.leave(data.oldRoom)
        socket.join(data.newRoom);
        console.log(`-- ${socket.id} is now disconnected from room: ${data.oldRoom}`)
        console.log(`-- ${socket.id} is now connected to room: ${data.newRoom}`)
        socket.emit("ack_room", data)
    });

    socket.on("add_name", (data) => {
        socket.leave(data.oldRoom)
        socket.join(data.newRoom);
        console.log(`-- ${socket.id} is now disconnected from room: ${data.oldRoom}`)
        console.log(`-- ${socket.id} is now connected to room: ${data.newRoom}`)
        namelist.push(data.name);
        console.log(namelist);
        socket.emit("ack_room", data)
    });

    socket.on("send_message", (data) =>{
        //socket.broadcast.emit("recieve_message", (data))
        socket.to(data.oldRoom).emit("recieve_message", (data));
    })

    socket.on("disconnect", () => {
        --count;
        console.log(`${count}] USER DISCONNECTED: ${socket.id}`);
        io.emit("online_no", count)
    })
});

server.listen(3001, () => {
    console.log("server is running");
});