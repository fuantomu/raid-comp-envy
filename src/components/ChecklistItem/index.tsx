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
  specs?: WarcraftPlayerSpec[];
  source?: any;
}

const ChecklistItem: FC<ChecklistItemProps> = ({
  iconSource,
  displayName,
  players,
  specs,
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
      specs={specs ? specs : undefined}
      source={source}
      displayName={displayName}
    >
      <Box css={styles.container}>
        <WarcraftIcon src={iconSource} />
        <Typography css={styles.name}>{displayName}</Typography>
        <Typography css={styles.count} fontWeight="bold">
          {count}
        </Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default ChecklistItem;
