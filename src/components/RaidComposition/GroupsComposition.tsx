/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import UUID from "../../utils/UUID";
import CompositionGroup from "../CompositionGroup";
import useStyles from "./useStyles";

interface GroupsCompositionProps {
  players: BuildPlayer[];
  editing: boolean;
  raid: number;
}

const GroupsComposition: FC<GroupsCompositionProps> = ({ players, editing, raid }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players, editing);
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups)
          .filter((group) => group?.groupId !== "roster" && group?.groupId !== "bench")
          .map((group) => {
            if (!group) return <></>;
            const { groupId, players } = group;
            return (
              <CompositionGroup
                key={UUID()}
                raid={raid}
                groupId={groupId}
                players={players}
                editing={editing}
              />
            );
          })}
        </Box>
        <Box key={UUID()} css={styles.ungrouped}>
          <CompositionGroup
            key={UUID()}
            groupId={"bench"}
            players={groups["bench"]?.players ?? []}
            raid={raid}
            spread
            editing={editing}
          />
        </Box>
    </>
  );
};

export default GroupsComposition;
