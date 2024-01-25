/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { Message } from "../../types";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import MessageGroup from "../MessageGroup";

interface MessageCompositionProps {
  messages: Message[];
  accountRole: number;
}

const MessageComposition: FC<MessageCompositionProps> = ({ messages, accountRole }) => {
  const styles = useStyles();
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        <MessageGroup key={UUID()} messages={messages} accountRole={accountRole} />
      </Box>
    </>
  );
};

export default MessageComposition;
