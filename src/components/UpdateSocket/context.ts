import { createContext } from "react";
import useWebSocket from "react-use-websocket";
import { MessageData } from "../../types";
import UUID from "../../utils/UUID";

const UpdateSocketContext = createContext(undefined);

export const UpdateSocketContextProvider = UpdateSocketContext.Provider;

export const socketId = localStorage.getItem("host") ?? UUID();

export const useUpdateSocketContext = (messageEvent, allowSelf?: boolean) =>
  useWebSocket(process.env.REACT_APP_WEBSOCKET, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    onMessage: (event) => {
      const message: MessageData = JSON.parse(event.data);
      if (message.message_type === "heartbeat") {
        return;
      }
      if (message.socketId !== socketId || allowSelf) {
        return messageEvent(message);
      }
    },
    filter: () => false,
    heartbeat: {
      message: JSON.stringify({ message_type: "heartbeat", host: socketId }),
      timeout: 120000, // 2 minutes, if no response is received, the connection will be closed
      interval: 45000 // every 45 seconds, a ping message will be sent
    },
    share: true,
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000)
  });
