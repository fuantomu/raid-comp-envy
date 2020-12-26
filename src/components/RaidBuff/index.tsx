/** @jsxImportSource @emotion/react */
import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import useChecklistStyles from "../RaidChecklist/useStyles";

export interface RaidBuffProps {
  buff: WarcraftRaidBuff;
  count: number;
}

const RaidBuff: FC<RaidBuffProps> = ({ buff, count }) => {
  const styles = useChecklistStyles(count);
  const [common] = useTranslation("common");

  return (
    <Box css={styles.container}>
      <Avatar css={styles.icon} src={IconProvider.getBuffIcon(buff)} />
      <Typography css={styles.name}>{common(`buff.${buff}`)}</Typography>
      <Typography css={styles.count}>{count}</Typography>
    </Box>
  );
};

export default RaidBuff;
