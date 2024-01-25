/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";
import { useDrop } from "react-dnd";
import { DragItemTypes } from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import Player from "../Player";
import useStyles from "./useStyles";
import { Typography } from "@mui/material";

export interface BasicGroupProps {
  players: BuildPlayer[];
  raid: number;
  accountRole: number;
}

const BasicGroup: FC<BasicGroupProps> = ({ players = [], raid, accountRole }) => {
  const styles = useStyles();
  const context = useAppContext();
  const [, drop] = useDrop(
    () => ({
      accept: DragItemTypes.PLAYER,
      drop: (player: BuildPlayer) => {
        context?.importPlayer(
          {
            id: player.id,
            name: player.name,
            class_name: player.class_name,
            spec: player.spec,
            race: player.race,
            raid,
            status: player.status,
            group_id: "roster" as GroupId,
            oldName: player.oldName,
            main: player.main,
            alt: player.alt
          },
          false,
          player.raid
        );
      }
    }),
    []
  );

  return (
    <Card ref={drop}>
      <CardContent>
        <Box
          css={[
            styles.default,
            players.length > 24
              ? styles.extremeInput
              : players.length > 16
                ? styles.largeInput
                : players.length > 8
                  ? styles.mediumInput
                  : styles.input
          ]}
        >
          {players.length > 0 ? (
            players.map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...{
                  onClick: () => context?.editPlayer(player)
                }}
                accountRole={accountRole}
                raid={raid}
              />
            ))
          ) : (
            <Typography
              style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
              variant="subtitle2"
            >
              Empty
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasicGroup;
