/** @jsxImportSource @emotion/react */
import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRole } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";

export interface BuildRolesCountProps {
  build: Build;
  handleChangeGrouping: () => void;
}

const BuildRolesCount: FC<BuildRolesCountProps> = ({ build, handleChangeGrouping }) => {
  const styles = useStyles();
  const [common] = useTranslation("common");

  return (
    <Box css={styles.roles} onClick={handleChangeGrouping}>
      {Object.keys(WarcraftRole).map((role) => {
        const label = common(`build.roles.${role}`);
        const count = build.players.filter(({ spec }) => RoleProvider.getSpecRole(spec) === role)
          .length;
        if (!count) return <></>;
        return (
          <Box key={UUID()} css={styles.role}>
            <Avatar
              css={styles.icon}
              src={IconProvider.getRoleIcon(role as WarcraftRole)}
              alt={label}
              title={label}
            />
            <Typography variant="h5">{count}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default BuildRolesCount;
