import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

export const socket = io(URL, {
  reconnection: true,
  timeout: 1000,
  requestTimeout: 10000,
  retries: 5,
  reconnectionDelayMax: 10000,
});
