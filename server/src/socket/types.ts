export interface Client {
  clientID: number;
  socket: any;
  players: Array<Object>;
}

export interface Clients {
  [key: string]: Client;
}

export interface Params {
  clients: Clients;
  isMobile?: boolean;
  socket: any;
  userID: number;
}

export interface RegisterPlayer {
  entryID: number;
  playerID: number;
}

export interface SendOrientation {
  playerID: number;
  roomID: number;
  orientation: Object;
}
