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
import envy from "../../icons/envy-ts-wenig-schatten.png"
import { sortFunctions } from "../../utils/sorting";

export interface RosterGroupProps {
  players: BuildPlayer[];
  groupId: GroupId;
  spread?: boolean;
  editing?: boolean;
  buildId: number;
  accountRole: number;
}


const RosterGroup: FC<RosterGroupProps> = ({
  groupId,
  players = [],
  spread = false,
  editing,
  buildId,
  accountRole
}) => {
  const styles = useStyles(spread);
  const [common] = useTranslation("common");
  const context = useAppContext();
  const [, drop] = useDrop(
    () => ({
      accept: DragItemTypes.PLAYER,
      drop:  (player: BuildPlayer) => {
        context?.importPlayer(
          {
            id: player.id,
            name: player.name,
            className: player.className,
            spec: player.spec,
            race: player.race,
            raid: player.raid,
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

  console.log(window.innerWidth)

  if (players.length === 0 && !editing) {
    return <></>;
  }

  return (
    <Card ref={drop}>
      <CardContent sx={{backgroundImage: `url(${envy})`, backgroundRepeat : 'no-repeat', backgroundPosition: "bottom right", backgroundSize:"20%"}}>
        <Box key={UUID()} display={"grid"} gridTemplateColumns={"2.5fr 1.2fr 1.8fr 3fr"}>
        <Typography style={{caretColor: "transparent"}} fontSize={"26px"} variant="subtitle1">
          {common("build.groups.group_each", { groupId: groupId.toString() })}
        </Typography>
        <ModalAdd accountRole={accountRole}/>
        <Button css={{height:"80%"}} sx={{color:"white", border:"1px solid #424242"}} onClick={()=> { context?.setRosterExpanded(!context?.getRosterExpanded()) }}>
            {common("build.roster.expand")}
        </Button>
        <TextField
          defaultValue="NAME"
          value={context?.getCurrentSorting()}
          onChange={context?.handleSorting}
          select // tell TextField to render select
          label="Sort by"
        >
          <MenuItem id={"alphabetical"} value={"NAME"}>{common("sorting.alphabetical")}</MenuItem>
          <MenuItem id={"tanks"} value={"ROLETANK"}>{common("sorting.tanks")}</MenuItem>
          <MenuItem id={"healer"} value={"ROLEHEALER"}>{common("sorting.healer")}</MenuItem>
          <MenuItem id={"melee"} value={"ROLEMELEE"}>{common("sorting.melee")}</MenuItem>
          <MenuItem id={"ranged"} value={"ROLERANGED"}>{common("sorting.ranged")}</MenuItem>
          <MenuItem id={"default"} value={"DEFAULT"}>{common("sorting.default")}</MenuItem>
        </TextField>


        </Box>
        <Box key={UUID()} sx={{maxHeight:"1160px"}} css={[styles.scroll, styles.spread(window.innerWidth)]}>
          {players.filter((player) => player.main?.toLowerCase() === player.name.toLowerCase()).map((player) => (
            <Player
              key={UUID()}
              {...player}
              {...(editing
                ? {
                    onClick: () => context?.editPlayer(player),
                  }
                : {})}
              rosterVisible={context?.getRosterExpanded()}
              alts={players.filter((altPlayer) => altPlayer.main?.toLowerCase() === player.name.toLowerCase() && altPlayer.name.toLowerCase() !== player.name.toLowerCase()).sort((a,b) => sortFunctions.DEFAULT(a,b))}
              accountRole={accountRole}
              raid={player.raid}
            />
          ))}
        </Box>
        <Box key={UUID()} css={styles.spread(window.innerWidth)}>
          {players.filter((player) => player.main === undefined || player.main === "").map((player) => (
            <Player
              key={UUID()}
              {...player}
              {...(editing
                ? {
                    onClick: () => context?.editPlayer(player),
                  }
                : {})}
              accountRole={accountRole}
              raid={player.raid}
            />
          ))}
        </Box>
        <Box minHeight={"128px"}></Box>
      </CardContent>
    </Card>
  );
};

export default RosterGroup;
