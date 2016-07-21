const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(52273, () => {
    console.log('running...52273');
});

const sockets = [];
const store = [];

io.on('connection', (socket) => {
    console.log('connection');
    sockets.push(socket);
    console.log(socket);
    socket.emit("init", store);

    socket.on('input', (data) => {
        console.log(data);
        const msg = {
            id: data.id,
            message: data.message
        };

        store.push(msg);
        for (let i = 0; i < sockets.length; i++) {
            sockets[i].emit('get', msg);
        }
    });
});
