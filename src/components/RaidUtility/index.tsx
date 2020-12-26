/** @jsxImportSource @emotion/react */
import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import useChecklistStyles from "../RaidChecklist/useStyles";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  count: number;
}

const RaidUtility: FC<RaidUtilityProps> = ({ utility, count }) => {
  const styles = useChecklistStyles(count);
  const [common] = useTranslation("common");

  return (
    <Box css={styles.container}>
      <Avatar css={styles.icon} src={IconProvider.getUtilityIcon(utility)} />
      <Typography css={styles.name}>{common(`utility.${utility}`)}</Typography>
      <Typography css={styles.count}>{count}</Typography>
    </Box>
  );
};

export default RaidUtility;
