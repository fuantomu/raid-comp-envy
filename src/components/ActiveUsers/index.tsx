/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { LoggedInUser, MessageData } from "../../types";
import { useUpdateSocketContext } from "../UpdateSocket/context";
import UUID from "../../utils/UUID";

export type Props = {};

const ActiveUsers: FC<Props> = () => {
  const [users, setUsers] = useState<LoggedInUser[]>([]);
  useUpdateSocketContext((message: MessageData) => {
    if (message.message_type === "users") {
      const newUsers: LoggedInUser[] = JSON.parse(message.data);
      setUsers(newUsers);
    } else if (message.message_type === "login") {
      const newUsers: LoggedInUser[] = JSON.parse(message.data);
      setUsers(newUsers);
    } else if (message.message_type === "logout") {
      const newUsers: LoggedInUser[] = users.filter((user) => user.host !== message.data["host"]);
      setUsers([...newUsers]);
    }
  }, true);

  return (
    <Tooltip
      title={
        <Typography sx={{ color: "white", fontSize: "12px", justifySelf: "center" }}>
          {users.map((user) => {
            return (
              <Box key={UUID()}>
                {user.username} ({user.host})
              </Box>
            );
          })}
        </Typography>
      }
    >
      <Box>{`Active Users: ${users.length}`}</Box>
    </Tooltip>
  );
};

export default ActiveUsers;
