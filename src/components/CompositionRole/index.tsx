/** @jsxImportSource @emotion/react */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import Player from "../Player";
import useStyles from "./useStyles";

export interface CompositionRoleProps {
  role: WarcraftRole;
  players: BuildPlayer[];
  spread?: boolean;
}

const buildRolePlayers = (players: BuildPlayer[]) => {
  return players.map((player) => <Player key={UUID()} {...player} />);
};

const CompositionRole: FC<CompositionRoleProps> = ({ role, players, spread = false }) => {
  const [common] = useTranslation("common");
  const styles = useStyles(spread);

  if (players.length === 0) {
    return <></>;
  }

  return (
    <Card>
      <CardContent>
        <Box css={styles.header}>
          <Avatar css={styles.icon} src={IconProvider.getRoleIcon(role)} />
          <Typography variant="subtitle1">{common(`build.roles.${role}`)}</Typography>
        </Box>
        <Box css={styles.spread}>{buildRolePlayers(players)}</Box>
      </CardContent>
    </Card>
  );
};

export default CompositionRole;
