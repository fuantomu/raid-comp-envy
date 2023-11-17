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
}

const RosterComposition: FC<RosterCompositionProps> = ({ players, editing }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players, editing);
  return (
    <>
        <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups)
          .filter((group) => group?.groupId === "roster")
          .map((group) => {
            if (!group) return <></>;
            const { groupId, players } = group;
            return (
              <RosterGroup
                key={UUID()}
                groupId={groupId}
                players={players}
                editing={editing}
              />
            );
          })}
      </Box>
    </>
  );
};

export default RosterComposition;
