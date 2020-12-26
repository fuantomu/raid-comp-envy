/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Build, BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import CompositionGroup from "../CompositionGroup";
import CompositionRole from "../CompositionRole";
import useStyles from "./useStyles";

export interface RaidCompositionProps {
  build: Build;
}

const RaidComposition: FC<RaidCompositionProps> = (props) => {
  const {
    build: { grouped, players, buildId },
  } = props;
  const styles = useStyles();

  if (grouped) {
    return (
      <div css={styles.grouped}>
        {BuildHelper.getGroups(players).map(({ groupId, players }) => (
          <CompositionGroup key={UUID()} groupId={groupId} players={players} />
        ))}
      </div>
    );
  } else {
    const buildRoles = BuildHelper.getRoles(players);
    return (
      <div css={styles.grouped}>
        {Object.keys(buildRoles).map((role) => (
          <CompositionRole
            key={UUID()}
            role={role as WarcraftRole}
            players={buildRoles[role as WarcraftRole]}
          />
        ))}
      </div>
    );
  }
};

export default RaidComposition;
