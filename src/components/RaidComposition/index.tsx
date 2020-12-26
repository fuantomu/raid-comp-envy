/** @jsxImportSource @emotion/react */
import { Box } from "@material-ui/core";
import { FC } from "react";
import { Build, BuildPlayer, BuildRoles, GroupId } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import CompositionGroup from "../CompositionGroup";
import CompositionRole from "../CompositionRole";
import useStyles from "./useStyles";

export interface RaidCompositionProps {
  build: Build;
}

const buildCompositionRoleMapper = (role: string, players: BuildPlayer[], spread = false) => (
  <CompositionRole key={UUID()} role={role as WarcraftRole} players={players} spread={spread} />
);

const buildCompositionGroupMapper = (groupId: GroupId, players: BuildPlayer[], spread = false) => (
  <CompositionGroup key={UUID()} groupId={groupId} players={players} spread={spread} />
);

const RaidComposition: FC<RaidCompositionProps> = (props) => {
  const {
    build: { grouped, players, buildId },
  } = props;
  const styles = useStyles();

  if (grouped) {
    const groups = BuildHelper.getGroups(players);
    return (
      <>
        <Box key={UUID()} css={styles.grouped}>
          {Object.values(groups)
            .filter((group) => group?.groupId !== "none")
            .map((group) => {
              if (!group) return <></>;
              const { groupId, players } = group;
              return buildCompositionGroupMapper(groupId, players);
            })}
        </Box>
        {groups["none"]?.players.length && (
          <Box key={UUID()} css={styles.ungrouped}>
            {buildCompositionGroupMapper("none", groups.none?.players, true)}
          </Box>
        )}
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
              return buildCompositionRoleMapper(role, buildRoles[role as WarcraftRole]);
            })}
        </Box>
        {buildRoles[WarcraftRole.Unknown].length && (
          <Box key={UUID()} css={styles.ungrouped}>
            {buildCompositionRoleMapper(
              WarcraftRole.Unknown,
              buildRoles[WarcraftRole.Unknown],
              true
            )}
          </Box>
        )}
      </>
    );
  }
};

export default RaidComposition;
