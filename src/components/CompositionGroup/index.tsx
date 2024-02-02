/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes, WarcraftPlayerRace } from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import Player from "../Player";
import useStyles from "./useStyles";
import { IconProvider } from "../../utils/IconProvider";
import WarcraftIcon from "../Icon";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";

export interface CompositionGroupProps {
  players: BuildPlayer[];
  group_id: GroupId;
  raid: number;
  accountRole: number;
}

const CompositionGroup: FC<CompositionGroupProps> = ({
  group_id,
  players = [],
  raid,
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
            class_name: player.class_name,
            spec: player.spec,
            race: player.race,
            raid: raid,
            status: player.status,
            group_id: group_id as GroupId,
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

  if (players.length === 0) {
    return <></>;
  }

  return (
    <Card sx={{ border: "1px solid black" }} ref={drop}>
      <CardContent>
        <Box display={"grid"} gridTemplateColumns={"1fr 20px"}>
          <Typography style={{ caretColor: "transparent", userSelect: "none" }} variant="subtitle1">
            {common("build.groups.group_each", { group_id: group_id.toString() })}
          </Typography>
          {players.filter((player) => player.race === WarcraftPlayerRace.Draenei).length > 0 &&
          localStorage.getItem("LastVersion") === "Wotlk" ? (
            <WarcraftIcon
              title={`${common(`races.Draenei`)}`}
              src={IconProvider.getUtilityIcon(WarcraftRaidUtility.DraeneiHit)}
            />
          ) : null}
        </Box>
        <Box css={styles.spread}>
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

export default CompositionGroup;
