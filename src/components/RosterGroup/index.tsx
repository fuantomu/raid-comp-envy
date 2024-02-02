/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
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
}

const RosterGroup: FC<RosterGroupProps> = ({ players = [] }) => {
  const styles = useStyles();
  const [common] = useTranslation("common");
  const context = useAppContext();
  const [sorting, setSorting] = useState("DEFAULT");
  const [rosterExpanded, setRosterExpanded] = useState(false);
  const accountRole = context.getAccountRole();
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
      <CardContent sx={{ maxHeight: window.innerHeight / 1.5 }}>
        <Box
          key={UUID()}
          display={"grid"}
          gridTemplateColumns={"2.5fr auto 1.2fr 1.3fr"}
          marginBottom={"10px"}
        >
          <Typography
            style={{ caretColor: "transparent", userSelect: "none" }}
            fontSize={"26px"}
            variant="subtitle1"
          >
            {common("build.groups.group_each", { group_id: "roster" })}
          </Typography>
          <ModalAdd accountRole={accountRole} fromRoster={true} />
          <Button
            sx={{
              color: "white",
              border: "1px solid black",
              marginLeft: "10px",
              marginRight: "10px"
            }}
            onClick={() => {
              setRosterExpanded(!rosterExpanded);
            }}
          >
            {common("build.roster.expand")}
          </Button>
          <TextField
            defaultValue="NAME"
            value={sorting}
            onChange={(e) => {
              setSorting(e.target.value);
            }}
            select // tell TextField to render select
            label="Sort by"
            sx={{ border: "1px solid black" }}
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
          sx={{
            maxHeight: window.innerHeight / 1.5,
            border: "1px solid black",
            borderRadius: "5px"
          }}
          css={[styles.scroll, styles.spread(window.innerWidth)]}
        >
          {players
            .filter((player) => player.main?.toLowerCase() === player.name.toLowerCase())
            .sort(sortFunctions[sorting])
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...{
                  onClick: () => context.editPlayer(player, true)
                }}
                rosterVisible={rosterExpanded}
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
            .sort(sortFunctions[sorting])
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...{
                  onClick: () => context.editPlayer(player, true)
                }}
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
            .sort(sortFunctions[sorting])
            .map((player) => (
              <Player
                key={UUID()}
                {...player}
                {...{
                  onClick: () => context.editPlayer(player, true)
                }}
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
