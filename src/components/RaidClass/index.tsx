/** @jsxImportSource @emotion/react */

import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { IconProvider } from "../../utils/IconProvider";
import useStyles from "./useStyles";
import useChecklistStyles from "../RaidChecklist/useStyles";

export interface RaidClassProps {
  className: WarcraftPlayerClass;
  count: number;
}

const RaidClass: FC<RaidClassProps> = ({ className, count }) => {
  const styles = { ...useChecklistStyles(count), ...useStyles(className, count) };
  const [common] = useTranslation("common");
  return (
    <Box css={styles.container}>
      <Avatar css={styles.icon} src={IconProvider.getClassIcon(className)} />
      <Typography css={styles.name}>{common(`classes.${className}`)}</Typography>
      <Typography css={styles.count}>{count}</Typography>
    </Box>
  );
};

export default RaidClass;
