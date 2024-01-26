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
import { Button, MenuItem, TextField } from "@mui/material";
import ModalAdd from "../ModalAdd";
import { sortFunctions } from "../../utils/sorting";

export interface RosterGroupProps {
  players: BuildPlayer[];
  group_id: GroupId;
  spread?: boolean;
  editing?: boolean;
  build_id: number;
  accountRole: number;
}

const RosterGroup: FC<RosterGroupProps> = ({
  group_id,
  players = [],
  spread = false,
  editing,
  build_id,
  accountRole
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
            class_name: player.class_name,
            spec: player.spec,
            race: player.race,
            raid: -5,
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

  if (players.length === 0 && !editing) {
    return <></>;
  }

  return (
    <Card ref={drop}>
      <CardContent sx={{ maxHeight: window.innerHeight / 1.6 }}>
        <Box key={UUID()} display={"grid"} gridTemplateColumns={"2.5fr 1.2fr 1.8fr 3fr"}>
          <Typography
            style={{ caretColor: "transparent", userSelect: "none" }}
            fontSize={"26px"}
            variant="subtitle1"
          >
            {common("build.groups.group_each", { group_id: group_id.toString() })}
          </Typography>
          <ModalAdd accountRole={accountRole} />
          <Button
            css={{ height: "80%" }}
            sx={{ color: "white", border: "1px solid #424242" }}
            onClick={() => {
              context?.setRosterExpanded(!context?.getRosterExpanded());
            }}
          >
            {common("build.roster.expand")}
          </Button>
          <TextField
            defaultValue="NAME"
            value={context?.getCurrentSorting()}
            onChange={context?.handleSorting}
            select // tell TextField to render select
            label="Sort by"
          >
            <MenuItem id={"alphabetical"} value={"NAME"}>
              {common("sorting.alphabetical")}
            </MenuItem>
            <MenuItem id={"tanks"} value={"ROLETANK"}>
              {common("sorting.tanks")}
            </MenuItem>
            <MenuItem id={"healer"} value={"ROLEHEALER"}>
              {common("sorting.healer")}
            </MenuItem>
            <MenuItem id={"melee"} value={"ROLEMELEE"}>
              {common("sorting.melee")}
            </MenuItem>
            <MenuItem id={"ranged"} value={"ROLERANGED"}>
              {common("sorting.ranged")}
            </MenuItem>
            <MenuItem id={"default"} value={"DEFAULT"}>
              {common("sorting.default")}
            </MenuItem>
          </TextField>
        </Box>
        <Box
          key={UUID()}
          sx={{ maxHeight: window.innerHeight / 1.6 }}
          css={[styles.scroll, styles.spread(window.innerWidth)]}
        >
          {players
            .filter((player) => player.main?.toLowerCase() === player.name.toLowerCase())
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...(editing
                  ? {
                      onClick: () => context?.editPlayer(player)
                    }
                  : {})}
                rosterVisible={context?.getRosterExpanded()}
                alts={players
                  .filter(
                    (altPlayer) =>
                      altPlayer.main?.toLowerCase() === player.name.toLowerCase() &&
                      altPlayer.name.toLowerCase() !== player.name.toLowerCase()
                  )
                  .sort((a, b) => sortFunctions.DEFAULT(a, b))}
                accountRole={accountRole}
                raid={player.raid}
              />
            ))}
          {players
            .filter((player) => player.main === undefined || player.main === "")
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...(editing
                  ? {
                      onClick: () => context?.editPlayer(player)
                    }
                  : {})}
                accountRole={accountRole}
                raid={player.raid}
              />
            ))}
          {players
            .filter((player) => {
              if (context?.getMains().find((main) => main.name === player.main)) {
                return false;
              }
              return true;
            })
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...(editing
                  ? {
                      onClick: () => context?.editPlayer(player)
                    }
                  : {})}
                accountRole={accountRole}
                raid={player.raid}
              />
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RosterGroup;
