import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_WEBSOCKET || "";

export const socket = io(URL, {
  reconnection: true,
  timeout: 1000,
  requestTimeout: 10000,
  retries: 5,
  reconnectionDelayMax: 10000,
});
