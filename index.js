const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 
var noOfUser = 0;

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('one user connected');
    noOfUser++;
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
        console.log('message : ' + msg)
    })

    socket.on('disconnect', () => {
        noOfUser--;
        console.log('user got disconnected');
        console.log('total users : ' + noOfUser);
    })
    console.log('total users : ' + noOfUser);
})

io.emit('some event', {someProperty: 'some value ', otherProperty : 'other value'});

server.listen(3000, () => {
    console.log('listening on port 3000');
});