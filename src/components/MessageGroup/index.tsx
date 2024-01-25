/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";
import { Message } from "../../types";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import { Typography } from "@mui/material";
import UpdateMessage from "../UpdateMessage";

export interface BasicGroupProps {
  messages: Message[];
  accountRole: number;
}

const MessageGroup: FC<BasicGroupProps> = ({ messages = [], accountRole }) => {
  const styles = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography
          style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
          variant="subtitle2"
        >
          Update-log
        </Typography>
        <Box
          key={UUID()}
          css={[styles.default, styles.scroll]}
          sx={{ maxHeight: window.innerHeight / 6, border: "1px solid black" }}
        >
          {messages.length > 0 ? (
            messages.map((message) => (
              <UpdateMessage key={UUID()} {...message} accountRole={accountRole} />
            ))
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
