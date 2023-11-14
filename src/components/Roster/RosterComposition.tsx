/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import UUID from "../../utils/UUID";
import CompositionGroup from "../CompositionGroup";
import useStyles from "./useStyles";

interface RosterCompositionProps {
  players: BuildPlayer[];
  editing: boolean;
}

const RosterComposition: FC<RosterCompositionProps> = ({ players, editing }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players, editing);
  return (
    <>
        <Box key={UUID()} css={styles.ungrouped}>
          <CompositionGroup
            key={UUID()}
            groupId={"roster"}
            players={groups["roster"]?.players ?? []}
            spread
            editing={editing}
          />
        </Box>
    </>
  );
};

export default RosterComposition;
