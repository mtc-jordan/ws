// const { Client } = require("colyseus.js");
const vedio = document.getElementById('vedio')
const vedio2 = document.getElementById('vedio2')
// import Colyseus from "colyseus.js";

const constraints = {
    'video': true,
    'audio': true
}
this.client = new Colyseus.Client("ws://localhost:5000");
this.client.joinOrCreate('audio_calls', { c: 4 }).then(async room => {
    // room.onMessage('message', (messge) => {
    //     console.log(messge)
    //     // vedio2.srcObject = messge;
    // })
    // const peerConnection = new RTCPeerConnection({
    //     iceServers: [
    //         {
    //             urls: ["stun:stun.l.google.com:19302"]
    //         }
    //     ]
    // });
    // peerConnection.createOffer().then(offer => {
    //     // var state = RTCPeerConnection.signalingState;
    //     // console.log(state)
    //     // // await peerConnection.setRemoteDescription(
    //     // //     new RTCSessionDescription()
    //     // // );
    //     peerConnection.createAnswer(offer).then(function (answer) {
    //         return peerConnection.setLocalDescription(answer);
    //     })
    // .then(function () {
    // Send the answer to the remote peer through the signaling server.
    console.log(res)
    // await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    room.send('message', {
        roomId: '123132',
    });
    room.send('message', 'test test test');
    //             })
    //             .catch((error) => console.log(error));
    //         //   .createAnswer().then(res => {

    //     })
    //     // });
})



navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
            console.log(track)
            peerConnection.addTrack(track, stream);
        });
        vedio.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });