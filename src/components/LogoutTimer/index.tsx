/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { accountRoleTimeouts } from "../../consts";

export type Props = {
  issueTime: number;
  accountRole: number;
};

const LogoutTimer: FC<Props> = ({ issueTime, accountRole }) => {
  const [logoutTime, setLogoutTime] = useState(0);

  useEffect(() => {
    if (issueTime > 0) {
      const interval = setInterval(() => {
        setLogoutTime(
          Math.floor(accountRoleTimeouts[accountRole]) -
            Math.floor((new Date().getTime() - issueTime) / 1000)
        );
      }, 1000);

      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutTime]);
  return (
    <Box display={"flex"} justifyContent={"center"} marginBottom={"20px"} marginLeft={"30%"}>
      Automatic logout in {logoutTime}s
    </Box>
  );
};

export default LogoutTimer;
