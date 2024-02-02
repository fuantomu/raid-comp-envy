import { createContext } from "react";
import useWebSocket from "react-use-websocket";
import { MessageData } from "../../types";
import UUID from "../../utils/UUID";

const UpdateSocketContext = createContext(undefined);

export const UpdateSocketContextProvider = UpdateSocketContext.Provider;

export const socketId = UUID();

export const useUpdateSocketContext = (messageEvent, allowSelf?: boolean) =>
  useWebSocket(process.env.REACT_APP_WEBSOCKET, {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    onMessage: (event) => {
      const message: MessageData = JSON.parse(event.data);
      if (message.socketId !== socketId || allowSelf) {
        return messageEvent(message);
      }
    },
    share: true,
    reconnectAttempts: 10,
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000)
  });
