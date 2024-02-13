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
  raid: string;
}

const RolesComposition: FC<RolesCompositionProps> = ({ players, raid }) => {
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
                raid={raid}
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
            raid={raid}
          />
        </Box>
      ) : null}
    </>
  );
};

export default RolesComposition;
