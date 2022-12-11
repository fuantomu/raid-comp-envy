/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes } from "../../consts";
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

const Player: FC<PlayerProps> = (props) => {
  const [common] = useTranslation();
  const { name, realm, class: className, spec, status, showRole, onClick } = props;
  const styles = useStyles(className);
  const isClickable = typeof onClick != "undefined";
  const [, drag] = useDrag(() => ({
    type: DragItemTypes.PLAYER,
    item: props,
  }));
  const fullName = `${name}${realm ? `-${realm}` : ""}`;

  return (
    <Box
      key={UUID()}
      css={styles.player(isClickable)}
      onClick={onClick ? onClick : () => {}}
      ref={isClickable ? drag : undefined}
    >
      <Box css={styles.icons(showRole)}>
        {showRole && <WarcraftIcon src={IconProvider.getSpecRoleIcon(spec)} />}
        <WarcraftIcon
          title={`${common(`specs.${spec}`)} ${common(`classes.${className}`)}`}
          src={spec ? IconProvider.getSpecIcon(spec) : IconProvider.getClassIcon(className)}
        />
      </Box>
      <Typography css={styles.name} title={fullName}>
        {fullName}
      </Typography>
      <AttendanceIcon status={status} />
    </Box>
  );
};

export default Player;
