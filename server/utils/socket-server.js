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
      origin: ["http://localhost:3000","https://admin.socket.io"],//Url for frontend
      methods: ["GET","POST"],                                    //HTTP MEthod allow
      credentials: true                   
  },
});

module.exports = { io, server };