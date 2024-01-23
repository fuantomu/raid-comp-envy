/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import UUID from "../../utils/UUID";
import RosterGroup from "../RosterGroup";
import useStyles from "./useStyles";

interface RosterCompositionProps {
  players: BuildPlayer[];
  editing: boolean;
  accountRole: number;
}

const RosterComposition: FC<RosterCompositionProps> = ({ players, editing, accountRole }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players, editing);
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups)
          .filter((group) => group?.group_id === "roster")
          .map((group) => {
            const { group_id, players } = group;
            return (
              <RosterGroup
                key={UUID()}
                group_id={group_id}
                players={players}
                editing={editing}
                build_id={-1}
                spread
                accountRole={accountRole}
              />
            );
          })}
      </Box>
    </>
  );
};

export default RosterComposition;
