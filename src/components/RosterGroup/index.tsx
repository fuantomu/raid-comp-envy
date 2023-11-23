/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes } from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import Player from "../Player";
import useStyles from "./useStyles";


export interface RosterGroupProps {
  players: BuildPlayer[];
  groupId: GroupId;
  spread?: boolean;
  editing?: boolean;
}

const RosterGroup: FC<RosterGroupProps> = ({
  groupId,
  players = [],
  spread = false,
  editing,
}) => {
  const styles = useStyles(spread);
  const [common] = useTranslation("common");
  const context = useAppContext();
  const [, drop] = useDrop(
    () => ({
      accept: DragItemTypes.PLAYER,
      drop: (player: BuildPlayer) => {
        context?.importBuild([
          {
            name: player.name,
            class: player.class,
            spec: player.spec,
            race: player.race,
            status: player.status,
            group: groupId as GroupId,
            realm: player.realm,
            oldName: player.oldName,
            main: player.main
          },
        ]);
      },
    }),
    []
  );

  if (players.length === 0 && !editing) {
    return <></>;
  }

  return (
    <Card ref={drop}>
      <CardContent>
        <Typography variant="subtitle1">
          {common("build.groups.group_each", { groupId: groupId.toString() })}
        </Typography>
        <Box key={UUID()} css={styles.spread}>
          {players.filter((player) => player.main?.toLowerCase() === player.name.toLowerCase()).map((player) => (
            <Player
              key={UUID()}
              {...player}
              {...(editing
                ? {
                    onClick: () => context?.editPlayer(player),
                  }
                : {})}
              alts={players.filter((altPlayer) => altPlayer.main?.toLowerCase() === player.name.toLowerCase() && altPlayer.name.toLowerCase() !== player.name.toLowerCase())}
            />
          ))}
        </Box>
        <Box key={UUID()} css={styles.spread}>
          {players.filter((player) => !player.main?? undefined).map((player) => (
            <Player
              key={UUID()}
              {...player}
              {...(editing
                ? {
                    onClick: () => context?.editPlayer(player),
                  }
                : {})}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RosterGroup;
