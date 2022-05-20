/** @jsxImportSource @emotion/react */
import Tooltip from "@mui/material/Tooltip";
import { FC, ReactElement } from "react";
import { BuildPlayer } from "../../types";

export interface TooltipPlayersProps {
  players: BuildPlayer[];
  children: ReactElement;
}

const TooltipPlayers: FC<TooltipPlayersProps> = (props) => {
  const { children, players } = props;
  return (
    <Tooltip title={players.map(({ name }) => name).join(", ")} placement="top" arrow>
      {children}
    </Tooltip>
  );
};

export default TooltipPlayers;
