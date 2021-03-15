/** @jsxImportSource @emotion/react */
import { Box } from "@material-ui/core";
import { FC } from "react";
import { Build } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import CompositionGroup from "../CompositionGroup";
import CompositionRole from "../CompositionRole";
import useStyles from "./useStyles";

export interface RaidCompositionProps {
  build: Build;
  grouped?: boolean;
  editing?: boolean;
}

const RaidComposition: FC<RaidCompositionProps> = ({ build: { players }, grouped, editing }) => {
  const styles = useStyles();

  if (grouped) {
    const groups = BuildHelper.getGroups(players, editing);
    return (
      <>
        <Box key={UUID()} css={styles.grouped}>
          {Object.values(groups)
            .filter((group) => group?.groupId !== "none")
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
  } else {
    const buildRoles = BuildHelper.getRoles(players);
    return (
      <>
        <Box key={UUID()} css={styles.grouped}>
          {Object.keys(buildRoles)
            .filter((role) => role !== WarcraftRole.Unknown)
            .map((role) => {
              return (
                <CompositionRole
                  key={UUID()}
                  role={role as WarcraftRole}
                  players={buildRoles[role as WarcraftRole]}
                />
              );
            })}
        </Box>
        {buildRoles[WarcraftRole.Unknown].length ? (
          <Box key={UUID()} css={styles.ungrouped}>
            <CompositionRole
              key={UUID()}
              role={WarcraftRole.Unknown}
              players={buildRoles[WarcraftRole.Unknown]}
              spread
            />
          </Box>
        ) : null}
      </>
    );
  }
};

export default RaidComposition;
