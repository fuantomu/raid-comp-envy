/** @jsxImportSource @emotion/react */
import Tooltip from "@mui/material/Tooltip";
import { FC, ReactElement } from "react";
import { BuildPlayer } from "../../types";
import { WarcraftPlayerSpec } from "../../consts";
import ChecklistTooltip from "../ChecklistTooltip";

export interface TooltipPlayersProps {
  players: BuildPlayer[];
  specs?: WarcraftPlayerSpec[];
  source?: any;
  children: ReactElement;
  version?: string;
  displayName?: string;
}

const TooltipPlayers: FC<TooltipPlayersProps> = (props) => {
  const { children, players, specs, source, version, displayName } = props;

  return (
    <Tooltip
      title={
        <ChecklistTooltip
          players={players}
          specs={specs}
          source={source}
          version={version}
          displayName={displayName}
        ></ChecklistTooltip>
      }
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 0.87)",
            maxWidth: "none"
          }
        }
      }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipPlayers;
