import { useEffect, useState } from "react";
import { socket } from "../services/websocket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const subscribe = (event: string, callback: (data: any) => void) => {
    socket.on(event, callback);
  };

  const unsubscribe = (event: string, callback: (data: any) => void) => {
    socket.off(event, callback);
  }

  return { subscribe, isConnected, unsubscribe };
};
