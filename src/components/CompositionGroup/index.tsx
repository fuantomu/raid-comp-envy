/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes, InviteStatus } from "../../consts";
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
  groupId: GroupId;
  spread?: boolean;
  editing?: boolean;
}

const CompositionGroup: FC<CompositionGroupProps> = ({
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
        context?.importPlayer(
          {
            id: player.id,
            name: player.name,
            class: player.class,
            spec: player.spec,
            race: player.race,
            status: InviteStatus.Unknown,
            group: groupId as GroupId,
            realm: player.realm,
            oldName: player.oldName,
            main: player.main
          },
        );
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
        <Box display={"grid"} gridTemplateColumns={"1fr 20px"}>
        <Typography variant="subtitle1">
          {common("build.groups.group_each", { groupId: groupId.toString() })}
        </Typography>
        {players.filter((player) => player.race === 'Draenei').length > 0 && localStorage.getItem("LastVersion") === 'Wotlk' ? (
          <WarcraftIcon
            title={`${common(`races.Draenei`)}`}
            src={IconProvider.getUtilityIcon(WarcraftRaidUtility.DraeneiHit)}
          />) : null}
        </Box>
        <Box css={styles.spread}>
          {players.map((player) => (
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

export default CompositionGroup;
