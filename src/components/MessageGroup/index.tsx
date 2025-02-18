/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC, useEffect, useState } from "react";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import { Typography } from "@mui/material";
import UpdateMessage from "../UpdateMessage";
import { useAppContext } from "../App/context";
import { BuildPlayer, Message, MessageData } from "../../types";
import { useUpdateSocketContext } from "../UpdateSocket/context";
import { BuildHelper } from "../../utils/BuildHelper";
import { RegisteredMessages } from "../../consts";

export interface MessageGroupProps {
  rosterRef: BuildPlayer[];
}

const MessageGroup: FC<MessageGroupProps> = ({ rosterRef }) => {
  const styles = useStyles();
  const context = useAppContext();
  const MAX_MESSAGES_TO_LOAD = 50;
  useUpdateSocketContext((message: MessageData) => {
    if (
      RegisteredMessages.roster.includes(message.message_type) ||
      RegisteredMessages.build.includes(message.message_type) ||
      RegisteredMessages.absence.includes(message.message_type)
    ) {
      const parsedMessage = BuildHelper.parseMessage(message, context.getBuilds(), rosterRef);
      setMessageHistory([parsedMessage, ...messageHistory].slice(0, MAX_MESSAGES_TO_LOAD));
    }
  }, true);

  const [messageHistory, setMessageHistory] = useState<Message[]>([]);

  const loadMessages = async () => {
    await BuildHelper.getMessages(MAX_MESSAGES_TO_LOAD).then((messages) => {
      setMessageHistory(
        messages
          .sort((a, b) => b.date - a.date)
          .map((message) => {
            return BuildHelper.parseMessage(message, context.getBuilds(), rosterRef);
          })
      );
    });
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography
          style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
          variant="subtitle2"
        >
          Updates (Click to show)
        </Typography>
        <Box
          css={[styles.default, styles.scroll]}
          sx={{
            maxHeight: window.innerHeight / 4.5,
            border: "1px solid black",
            borderRadius: "2px"
          }}
        >
          {messageHistory.length > 0 ? (
            messageHistory.map((message: Message) => <UpdateMessage key={UUID()} {...message} />)
          ) : (
            <Typography
              style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
              variant="subtitle2"
            >
              Empty
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MessageGroup;
