/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import TooltipPlayers from "../TooltipPlayers";
import useChecklistStyles from "./useStyles";
import { WarcraftPlayerSpec } from "../../consts";

export interface ChecklistItemProps {
  iconSource: string;
  displayName: string;
  styles?: {
    name: any;
  };
  players: BuildPlayer[];
  list?: { specs: WarcraftPlayerSpec[]; classes: {} };
  source?: any;
}

const ChecklistItem: FC<ChecklistItemProps> = ({
  iconSource,
  displayName,
  players,
  list,
  source,
  styles: stylesOverride
}) => {
  const count = players.length;
  const styles = {
    ...useChecklistStyles(count),
    ...stylesOverride
  };

  return (
    <TooltipPlayers
      key={UUID()}
      players={players}
      list={list ? list : { specs: [], classes: {} }}
      source={source}
      displayName={displayName}
    >
      <Box css={styles.container} key={UUID()}>
        <WarcraftIcon css={{ width: "24px", height: "24px" }} src={iconSource} />
        <Typography css={styles.name}>{displayName}</Typography>
        <Typography css={styles.count} fontWeight="bold">
          {count}
        </Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default ChecklistItem;
