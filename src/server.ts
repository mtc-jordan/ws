import express, { Application } from "express";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import { Server as ServerColyeus, RedisPresence } from "colyseus";
import { MyRoom } from './room/room';

// import { Mongoose } from 'mongoose';
// import { MongooseDriver } from "colyseus/lib/matchmaker/drivers/MongooseDriver"

export class Server {
    // private httpServer: HTTPServer;
    private app: Application;
    // private io: SocketIOServer;
    private audioServer: ServerColyeus;
    private readonly DEFAULT_PORT = Number(process.env.PORT) || 5000;
    // private mongoose: Mongoose;

    constructor() {
        // this.initialize();
        this.app = express();
        // this.httpServer = createServer(this.app);
        // this.io = require("socket.io")(this.httpServer);
        this.audioServer = new ServerColyeus({
            server: createServer(this.app),
            // driver: new MongooseDriver(),
            // presence: new RedisPresence()
        });
        // this.mongoose = new Mongoose();
        this.configureApp();
        this.handleRoutes();
        this.handleRooms();
        // this.handleSocketConnection();
    }

    // private initialize(): void {
    //     this.app = express();
    //     this.httpServer = createServer(this.app);
    //     this.io = socketIO(this.httpServer);
    // }

    private handleRoutes(): void {
        this.audioServer.define('audio_calls', MyRoom).enableRealtimeListing; // it should be an array contains all rooms id 
    }
    private handleRooms(): void {

        // this.app.get("/", (req, res) => {
        //     this.client.joinOrCreate('id', { c: 4 })
        // });
    }

    // private handleSocketConnection(): void {
    //     this.io.on("connection", socket => {
    //         console.log("Socket connected.");
    //     });
    // }

    private configureApp(): void {
        // this.app.use(express.static(path.join(__dirname, "./public")));
    }

    public listen(): void {
        this.audioServer.listen(this.DEFAULT_PORT).then(() => {
            console.log(`The server listen on port ${this.DEFAULT_PORT}, ws://localhost:${this.DEFAULT_PORT}`);
        })
    }
}