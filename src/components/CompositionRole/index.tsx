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
  raid: number;
  accountRole: number;
}

const CompositionRole: FC<CompositionRoleProps> = ({ role, players, raid, accountRole }) => {
  const context = useAppContext();
  const [common] = useTranslation("common");
  const styles = useStyles();

  const buildRolePlayers = (players: BuildPlayer[], raid: number) => {
    return players.map((player) => (
      <Player
        key={UUID()}
        {...player}
        {...{
          onClick: () => context?.editPlayer(player)
        }}
        accountRole={accountRole}
        raid={raid}
      />
    ));
  };

  return (
    <Card sx={{ border: "1px solid black" }}>
      <CardContent>
        <Box css={styles.header}>
          <WarcraftIcon src={IconProvider.getRoleIcon(role)} />
          <Typography style={{ caretColor: "transparent" }} variant="subtitle1">
            {common(`build.roles.${role}`)}
          </Typography>
        </Box>
        <Box css={styles.spread}>{buildRolePlayers(players, raid)}</Box>
      </CardContent>
    </Card>
  );
};

export default CompositionRole;
