// import { Server } from './server';

// const server = new Server();

// server.listen();

const { Client } = require("colyseus.js");

this.client = new Client("ws://localhost:5000");
this.client.c
this.client.joinOrCreate('audio_calls', { roomId: '123132' }).then(room => {
    room.send('message', {
        roomId: '123132',
        type: 'create-new-meeting',
        username: 'motasem',
        candidate: 'candidatecandidate'
    })
 
    room.send('message', {
        roomId: '123132',
        type: 'store-remote',
        username: 'motasem1111111111111',
        candidate: 'candidatecandidate111111111111'
    })
    room.send('message', {
        roomId: '123132',
        type: 'user-leave',
        username: 'motasem1111111111111',
        candidate: 'candidatecandidate111111111111'
    })
    room.send('message', {
        roomId: '123132',
        type: 'get-remotes',
        username: 'motasem',
        candidate: 'candidatecandidate'
    })
    room.onMessage('receive-remotes', (message) => console.log(JSON.stringify(message)))
    room.onMessage('user-leave-meeting', (message) => console.log(JSON.stringify(message)))
   
})
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, "./")))



// this.client.joinOrCreate
app.listen(4200)
