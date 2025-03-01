/** @jsxImportSource @emotion/react */
import Tooltip from "@mui/material/Tooltip";
import { FC, ReactElement } from "react";
import { BuildPlayer } from "../../types";
import { WarcraftPlayerSpec } from "../../consts";
import ChecklistTooltip from "../ChecklistTooltip";
import UUID from "../../utils/UUID";

export interface TooltipPlayersProps {
  players: BuildPlayer[];
  list?: { specs: WarcraftPlayerSpec[]; classes: {} };
  source?: any;
  children: ReactElement;
  displayName?: string;
}

const TooltipPlayers: FC<TooltipPlayersProps> = (props) => {
  const { children, players, list, source, displayName } = props;

  return (
    <Tooltip
      title={
        <ChecklistTooltip
          players={players}
          list={list}
          source={source}
          displayName={displayName}
          key={UUID()}
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
      key={UUID()}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipPlayers;
