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
}

const GroupsComposition: FC<GroupsCompositionProps> = ({ players, editing }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players, editing);
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups)
          .filter((group) => group?.groupId !== "none" && group?.groupId !== "roster")
          .map((group) => {
            if (!group) return <></>;
            const { groupId, players } = group;
            return (
              <CompositionGroup
                key={UUID()}
                groupId={groupId}
                players={players}
                editing={editing}
              />
            );
          })}
      </Box>
      {groups["none"]?.players.length ? (
        <Box key={UUID()} css={styles.ungrouped}>
          <CompositionGroup
            key={UUID()}
            groupId={"none"}
            players={groups["none"]?.players ?? []}
            spread
            editing={editing}
          />
        </Box>
      ) : null}
    </>
  );
};

export default GroupsComposition;
