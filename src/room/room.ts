// rooms/MyRoom.ts (server-side, room file)
import { Room, Client, ServerError } from "colyseus";

export class MyRoom extends Room{

    maxClients = 100;

    rooms: {
        roomId: string,
        remote_items: {
            username: string,
            remote: string,
        }[]
    }[] = [];

    usersBasedOnRoom: {
        roomId: string,
        users: Client[],
    }[] = [];

    // room has been created: bring your own logic
    async onCreate(options: any) { }

    async onJoin(client: Client, data?: any) {

        let userBasedOnRoomWithIndex = this.getUserBasedOnRoomWithIndex(data.roomId);
        if (userBasedOnRoomWithIndex.index === -1) {
            const userBasedOnRoom = {
                roomId: data.roomId,
                users: [],
            }
            this.usersBasedOnRoom.push(userBasedOnRoom);
            userBasedOnRoomWithIndex = { userBasedOnRoom, index: 0 };
        }
        
        this.usersBasedOnRoom[userBasedOnRoomWithIndex.index]?.users.push(client);
        this.message();

    }

    getUserBasedOnRoomWithIndex(roomId: string): { userBasedOnRoom: any, index: number } {
        let roomIndex = -1;
        const userBasedOnRoom = this.usersBasedOnRoom.filter((element, index) => {
            if (roomId === element.roomId) {
                roomIndex = index;
                return element;
            }
        });
        return { userBasedOnRoom, index: roomIndex };
    }

    message() {
        this.onMessage("message", (client: Client, data: any) => {

            const room = this.getRoom(data.roomId);
            const roomIndex = this.getRoomIndex(data.roomId);

            switch (data.type) {
                case "create-new-meeting":
                    if (roomIndex !== -1) {
                        return;
                    }

                    const newRoom = {
                        roomId: data.roomId,
                        remote_items: [{
                            username: data.username,
                            remote: data.candidate,
                        }]
                    };
                    this.rooms.push(newRoom);
                    break;

                case "store-remote":
                    if (roomIndex === -1) {
                        return;
                    }

                    this.rooms[roomIndex].remote_items?.push({
                        username: data.username,
                        remote: data.candidate,
                    });

                    this.sendDateToAllInRoom(data.roomId, 'receive-remotes', room);
                    break;

                case "get-remotes":
                    if (roomIndex === -1) {
                        return;
                    }
                    client.send('receive-remotes', room);
                    break;

                case "user-leave":
                    if (roomIndex === -1) {
                        return;
                    }

                    const userIndex = this.getUserIndex(roomIndex, data.username);
                    if (userIndex === -1) {
                        return;
                    }

                    const remote = this.rooms[roomIndex].remote_items[userIndex];                    
                    this.rooms[roomIndex].remote_items?.splice(userIndex, 1);

                    this.sendDateToAllInRoom(data.roomId, 'user-leave-meeting', remote);
                    break;
            }
        });
    }

    sendDateToAllInRoom(roomId: string, type: string, data: any) {
        const userBasedOnRoomWithIndex = this.getUserBasedOnRoomWithIndex(roomId);
        userBasedOnRoomWithIndex?.userBasedOnRoom[0].users.forEach((client: any) => {
            client.send(type, data);
        });
    }

    getRoom(roomId: string) {
        return this.rooms.filter(room => room.roomId === roomId);
    }

    getUserIndex(roomIndex: number, username: string): number {
        let index = -1;
        this.rooms[roomIndex].remote_items?.map((remote, i: number) => {
            if (username === remote.username) {
                index = i;
            }
        });
        return index;
    }

    getRoomIndex(roomId: string): number {
        let index = -1;
        this.rooms.map((room, i: number) => {
            if (roomId === room.roomId) {
                index = i;
            }
        });
        return index;
    }

    // client left: bring your own logic
    async onLeave(client: Client, consented?: any) {
    }

    // room has been disposed: bring your own logic
    async onDispose() { }
}