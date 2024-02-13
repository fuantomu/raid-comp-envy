/** @jsxImportSource @emotion/react */
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
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";

export interface BuildRolesCountProps {
  build: Build;
}

const BuildRolesCount: FC<BuildRolesCountProps> = ({ build }) => {
  const styles = useStyles();
  const [common] = useTranslation("common");

  return (
    <Box key={UUID()} css={styles.roles}>
      {build?.players.length > 0 && (
        <Box key={UUID()} css={styles.role}>
          <WarcraftIcon
            key={UUID()}
            src={IconProvider.getCustomIcon(CustomIcon.GroupNeedMore)}
            alt={common("build.roles.total")}
            title={common("build.roles.total")}
            css={{ width: "24px", height: "24px" }}
          />
          <Typography key={UUID()} variant="h5">
            {
              build?.players.filter(({ group_id }) => group_id !== "roster" && group_id !== "bench")
                .length
            }
          </Typography>
        </Box>
      )}
      {Object.keys(WarcraftRole).map((role) => {
        const label = common(`build.roles.${role}`);
        const count = build?.players.filter(
          ({ spec, group_id }) =>
            RoleProvider.getSpecRole(spec) === role && group_id !== "roster" && group_id !== "bench"
        ).length;
        if (!count) return false;
        return (
          <Box key={UUID()} css={styles.role}>
            <WarcraftIcon
              key={UUID()}
              src={IconProvider.getRoleIcon(role as WarcraftRole)}
              alt={label}
              title={label}
              css={{ width: "24px", height: "24px" }}
            />
            <Typography key={UUID()} variant="h5">
              {count}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default BuildRolesCount;
