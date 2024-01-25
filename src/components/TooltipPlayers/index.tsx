/** @jsxImportSource @emotion/react */
import Tooltip from "@mui/material/Tooltip";
import { FC, ReactElement } from "react";
import { BuildPlayer } from "../../types";
import { WarcraftPlayerSpec } from "../../consts";

export interface TooltipPlayersProps {
  players: BuildPlayer[];
  specs?: WarcraftPlayerSpec[];
  children: ReactElement;
}

const TooltipPlayers: FC<TooltipPlayersProps> = (props) => {
  const { children, players, specs } = props;

  const includedPlayers = players.length > 0 ? players.map(({ name }) => name).join(", ") : "None";
  const includedSpecs = specs ? "\n\nProvided by: " + specs.join(", ") : "";
  return (
    <Tooltip
      title={
        <div style={{ whiteSpace: "pre-line" }}>
          {"Players: " + includedPlayers + includedSpecs}
        </div>
      }
      placement="top"
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default TooltipPlayers;
