import { Schema, MapSchema, type } from "@colyseus/schema";

export class ClientSchema extends Schema {
    @type("string")
    roomId: string = '';

    @type([])
    users: [] = [];
  }