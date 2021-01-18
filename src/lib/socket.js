import { io } from "socket.io-client";

let socketIO = null;

if (socketIO === null) {
  socketIO = io("localhost:3000");
}

export default socketIO;
