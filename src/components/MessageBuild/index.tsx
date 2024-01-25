/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Message } from "../../types";
import MessageComposition from "./MessageComposition";

export interface MessageProps {
  messages: Message[];
  accountRole: number;
}

const MessageBuild: FC<MessageProps> = ({ messages, accountRole }) => {
  return <MessageComposition messages={messages} accountRole={accountRole} />;
};

export default MessageBuild;
