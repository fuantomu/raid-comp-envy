/** @jsxImportSource @emotion/react */
import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import useChecklistStyles from "../RaidChecklist/useStyles";
import TooltipPlayers from "../TooltipPlayers";

export interface RaidBuffProps {
  buff: WarcraftRaidBuff;
  players: BuildPlayer[];
}

const RaidBuff: FC<RaidBuffProps> = ({ buff, players }) => {
  const count = players.length;
  const styles = useChecklistStyles(count);
  const [common] = useTranslation("common");

  return (
    <TooltipPlayers key={UUID()} players={players}>
      <Box css={styles.container}>
        <Avatar css={styles.icon} src={IconProvider.getBuffIcon(buff)} />
        <Typography css={styles.name}>{common(`buff.${buff}`)}</Typography>
        <Typography css={styles.count}>{count}</Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default RaidBuff;
