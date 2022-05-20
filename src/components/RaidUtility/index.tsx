/** @jsxImportSource @emotion/react */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import useChecklistStyles from "../RaidChecklist/useStyles";
import TooltipPlayers from "../TooltipPlayers";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  players: BuildPlayer[];
}

const RaidUtility: FC<RaidUtilityProps> = ({ utility, players }) => {
  const count = players.length;
  const styles = useChecklistStyles(count);
  const [common] = useTranslation("common");

  return (
    <TooltipPlayers key={UUID()} players={players}>
      <Box css={styles.container}>
        <Avatar css={styles.icon} src={IconProvider.getUtilityIcon(utility)} />
        <Typography css={styles.name}>{common(`utility.${utility}`)}</Typography>
        <Typography css={styles.count}>{count}</Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default RaidUtility;
