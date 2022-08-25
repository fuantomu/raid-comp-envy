/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import AttendanceIcon from "../AttendanceIcon";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";

export interface PlayerProps extends BuildPlayer {
  showRole?: boolean;
  onClick?: () => void;
}

const Player: FC<PlayerProps> = ({
  name,
  realm,
  class: className,
  spec,
  status,
  showRole,
  onClick,
}) => {
  const styles = useStyles(className);

  return (
    <Box key={UUID()} css={styles.player} onClick={onClick ? onClick : () => {}}>
      <Box css={styles.icons}>
        {showRole && <WarcraftIcon src={IconProvider.getSpecRoleIcon(spec)} />}
        <WarcraftIcon
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
