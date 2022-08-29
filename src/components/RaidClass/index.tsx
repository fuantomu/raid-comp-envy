/** @jsxImportSource @emotion/react */

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import useChecklistStyles from "../RaidChecklist/useStyles";
import TooltipPlayers from "../TooltipPlayers";
import useStyles from "./useStyles";

export interface RaidClassProps {
  className: WarcraftPlayerClass;
  players: BuildPlayer[];
}

const RaidClass: FC<RaidClassProps> = ({ className, players }) => {
  const count = players.length;
  const styles = { ...useChecklistStyles(count), ...useStyles(className, count) };
  const [common] = useTranslation("common");
  return (
    <TooltipPlayers key={UUID()} players={players}>
      <Box css={styles.container}>
        <WarcraftIcon src={IconProvider.getClassIcon(className)} />
        <Typography css={styles.name}>{common(`classes.${className}`)}</Typography>
        <Typography css={styles.count}>{count}</Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default RaidClass;
