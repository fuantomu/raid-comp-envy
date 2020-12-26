/** @jsxImportSource @emotion/react */

import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { IconProvider } from "../../utils/IconProvider";
import useStyles from "./useStyles";
import useChecklistStyles from "../RaidChecklist/useStyles";
import { BuildPlayer } from "../../types";
import UUID from "../../utils/UUID";
import TooltipPlayers from "../TooltipPlayers";

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
        <Avatar css={styles.icon} src={IconProvider.getClassIcon(className)} />
        <Typography css={styles.name}>{common(`classes.${className}`)}</Typography>
        <Typography css={styles.count}>{count}</Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default RaidClass;
