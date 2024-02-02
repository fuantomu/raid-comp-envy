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
  raid: number;
  accountRole: number;
}

const GroupsComposition: FC<GroupsCompositionProps> = ({ players, raid, accountRole }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players);
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups)
          .filter((group) => group?.group_id !== "roster" && group?.group_id !== "bench")
          .map((group) => {
            if (!group) return <></>;
            const { group_id, players } = group;
            return (
              <CompositionGroup
                key={UUID()}
                raid={raid}
                group_id={group_id}
                players={players}
                accountRole={accountRole}
              />
            );
          })}
      </Box>
      <Box key={UUID()} css={styles.ungrouped}>
        <CompositionGroup
          key={UUID()}
          group_id={"bench"}
          players={groups["bench"]?.players ?? []}
          raid={raid}
          accountRole={accountRole}
        />
      </Box>
    </>
  );
};

export default GroupsComposition;
