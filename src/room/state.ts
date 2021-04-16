import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";
import { ClientSchema } from './client';

export class State extends Schema {
    @type({ map: ClientSchema })
    clients = new MapSchema<ClientSchema>();
}