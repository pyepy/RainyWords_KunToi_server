const express = require('express');     //Create server instance
const app = express();                  //Create App variable
const http = require("http");           //Create insatnce of http lib
const { Server } = require('socket.io');
const cors = require('cors');           //import cors lib
const { Socket } = require('dgram');

app.use(cors());                        //Set prj to accept cors

const server = http.createServer(app);

const io = new Server(server, {                                     //For anything related to socket.io in the backend
  cors: {                                                         //How to fix connection problem, by setting up
      origin: [     //Url for frontend
        "http://localhost:3000",
        "https://admin.socket.io",
      ],
      methods: ["GET","POST"],                                    //HTTP MEthod allow
      credentials: true                   
  },
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fakeIndex.js', (req, res) => {
  res.sendFile(__dirname + '/fakeIndex.js');
});

module.exports = { io, server };