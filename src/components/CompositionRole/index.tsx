/** @jsxImportSource @emotion/react */
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
import { useAppContext } from "../App/context";
import WarcraftIcon from "../Icon";
import Player from "../Player";
import useStyles from "./useStyles";

export interface CompositionRoleProps {
  role: WarcraftRole;
  players: BuildPlayer[];
  spread?: boolean;
  editing?: boolean;
  raid: Number;
}

const CompositionRole: FC<CompositionRoleProps> = ({
  role,
  players,
  spread = false,
  editing = false,
  raid
}) => {
  const context = useAppContext();
  const [common] = useTranslation("common");
  const styles = useStyles(spread);

  const buildRolePlayers = (players: BuildPlayer[], raid: Number) => {
    return players.map((player) => (
      <Player
        key={UUID()}
        raid={raid}
        {...player}
        {...(editing
          ? {
              onClick: () => context?.editPlayer(player),
            }
          : {})}
      />
    ));
  };

  return (
    <Card>
      <CardContent>
        <Box css={styles.header}>
          <WarcraftIcon src={IconProvider.getRoleIcon(role)} />
          <Typography style={{caretColor: "transparent"}} variant="subtitle1">{common(`build.roles.${role}`)}</Typography>
        </Box>
        <Box css={styles.spread}>{buildRolePlayers(players, raid)}</Box>
      </CardContent>
    </Card>
  );
};

export default CompositionRole;
