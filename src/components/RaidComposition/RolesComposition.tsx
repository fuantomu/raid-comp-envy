/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import CompositionRole from "../CompositionRole";
import useStyles from "./useStyles";

interface RolesCompositionProps {
  players: BuildPlayer[];
  editing: boolean;
  raid: number;
  accountRole: number;
}

const RolesComposition: FC<RolesCompositionProps> = ({ players, editing, raid, accountRole }) => {
  const styles = useStyles();
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
                editing={editing}
                raid={raid}
                accountRole={accountRole}
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
            editing={editing}
            raid={raid}
            spread
            accountRole={accountRole}
          />
        </Box>
      ) : null}
    </>
  );
};

export default RolesComposition;
