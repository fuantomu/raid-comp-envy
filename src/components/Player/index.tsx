/** @jsxImportSource @emotion/react */
import { Avatar, Box, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import AttendanceIcon from "../AttendanceIcon";
import useStyles from "./useStyles";

export interface PlayerProps extends BuildPlayer {
  showRole?: boolean;
}

const Player: FC<PlayerProps> = ({ name, realm, class: className, spec, status, showRole }) => {
  const styles = useStyles(className);
  const [common] = useTranslation("common");

  return (
    <Box css={styles.player}>
      <Box css={styles.icons}>
        {showRole && <Avatar css={styles.icon} src={IconProvider.getSpecRoleIcon(spec)} />}
        <Avatar
          css={styles.icon}
          src={spec ? IconProvider.getSpecIcon(spec) : IconProvider.getClassIcon(className)}
        />
      </Box>
      <Typography css={styles.name}>
        {name}
        {realm ? `-${realm}` : null}
      </Typography>
      <AttendanceIcon status={status} />
    </Box>
  );
};

export default Player;
