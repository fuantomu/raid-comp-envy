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
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";

export interface BasicGroupProps {
  players: BuildPlayer[];
  raid: number;
  name: string;
  visible?: boolean;
  accountRole: number;
}

const BasicGroup: FC<BasicGroupProps> = ({
  players = [],
  raid,
  name,
  visible,
  accountRole
}) => {
  const styles = useStyles();
  const [common] = useTranslation("common");
  const context = useAppContext();
  const [, drop] = useDrop(
    () => ({
      accept: DragItemTypes.PLAYER,
      drop: (player: BuildPlayer) => {
        context?.importPlayer(
          {
            id: player.id,
            name: player.name,
            className: player.className,
            spec: player.spec,
            race: player.race,
            raid,
            status: player.status,
            group: "roster" as GroupId,
            oldName: player.oldName,
            main: player.main
          }
        );
      },
    }),
    []
  );

  return (
    <Card ref={drop}>
      <CardContent>
        <Box display={"grid"} gridTemplateColumns={"1fr 20px"}>
          <Typography style={{caretColor: "transparent"}} variant="subtitle1">
            {common("build.groups.group_each", { groupId: name })}
          </Typography>
          {visible? <ArrowDropDown></ArrowDropDown> : <ArrowLeft></ArrowLeft>}
          </Box>
          {visible? <Box css={[styles.default,players.length > 24? styles.extremeInput : players.length > 16? styles.largeInput : players.length > 8? styles.mediumInput : styles.input]}>
            {players.map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...({
                      onClick: () => context?.editPlayer(player),
                    })}
                accountRole={accountRole}
                raid={raid}
              />
            ))}
        </Box> : <></>}
      </CardContent>
    </Card>
  );
};

export default BasicGroup;
