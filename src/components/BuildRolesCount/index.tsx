/** @jsxImportSource @emotion/react */
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { CustomIcon } from "../../utils/IconProvider/consts";
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
    <Box key={UUID()} css={styles.roles} onClick={handleChangeGrouping}>
      {build.players.length > 0 && (
        <Box key={UUID()} css={styles.role}>
          <Avatar
            css={styles.icon}
            src={IconProvider.getCustomIcon(CustomIcon.GroupNeedMore)}
            alt={common("build.roles.total")}
            title={common("build.roles.total")}
          />
          <Typography variant="h5">{build.players.length}</Typography>
        </Box>
      )}
      {Object.keys(WarcraftRole).map((role) => {
        const label = common(`build.roles.${role}`);
        const count = build.players.filter(
          ({ spec }) => RoleProvider.getSpecRole(spec) === role
        ).length;
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
