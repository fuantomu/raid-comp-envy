/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useDrag} from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes, WarcraftPlayerRace } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import AttendanceIcon from "../AttendanceIcon";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import { useAppContext } from "../App/context";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";

export interface PlayerProps extends BuildPlayer {
  showRole?: boolean;
  onClick?: () => void;
  alts?: BuildPlayer[];
  rosterVisible?: boolean;
}

const Player: FC<PlayerProps> = (props) => {
  const [common] = useTranslation();
  const { name, className, spec, status, race, raid, showRole, onClick, rosterVisible, alts=[]} = props;
  const styles = useStyles(className);
  const context = useAppContext()
  const [visible, setVisible] = useState(false);
  const isClickable = typeof onClick != "undefined";
  const [, drag] = useDrag(() => ({
    type: DragItemTypes.PLAYER,
    item: props,
  }));
  const fullName = `${name}`;

  return (
    <Box>
      <Box
        key={UUID()}
        css={styles.player(isClickable, status)}
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
        <Box>
          <WarcraftIcon
            title={`${common(`races.${race}`)}`}
            src={IconProvider.getRaceIcon(race?? WarcraftPlayerRace.Human)}
          />
        </Box>
        <Typography css={styles.name} title={fullName}>
          {fullName}
        </Typography>
        <AttendanceIcon status={status} absence={context?.getPlayerAbsence(name)} />

        {alts.length > 0? (<Box onClick={(event) => {event.preventDefault(); event.stopPropagation(); setVisible(!visible);}}>
          {(!visible && !rosterVisible)? (<ArrowLeft></ArrowLeft>): (<ArrowDropDown></ArrowDropDown>)}
        </Box>) : null}

      </Box>
      {alts.length > 0 && (visible || rosterVisible) ? (
        <Box key={UUID()}>
          <></>
          {alts.map((player:BuildPlayer) => (
            <Player
              key={UUID()}
              raid={raid}
              {...player}
              {...({onClick: () => context?.editPlayer(player)})}
            />
          ))}
        </Box>) : null}
    </Box>
  );
};

export default Player;
