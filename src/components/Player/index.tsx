/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useDrag} from "react-dnd";
import { useTranslation } from "react-i18next";
import { AccountRole, DragItemTypes, WarcraftPlayerRace } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import AttendanceIcon from "../AttendanceIcon";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import { useAppContext } from "../App/context";
import { ArrowDropDown, ArrowLeft, Star } from "@mui/icons-material";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import { Tooltip } from "@mui/material";
import { sortFunctions } from "../../utils/sorting";

export interface PlayerProps extends BuildPlayer {
  showRole?: boolean;
  onClick?: () => void;
  alts?: BuildPlayer[];
  rosterVisible?: boolean;
  accountRole: number;
  raid: number;
}

const Player: FC<PlayerProps> = (props) => {
  const [common] = useTranslation();
  const { name, class_name, spec, status, race, group_id, raid, showRole, onClick, rosterVisible, alts=[], main, alt, accountRole} = props;
  const styles = useStyles(class_name);
  const context = useAppContext()
  const [visible, setVisible] = useState(false);
  const isClickable = typeof onClick != "undefined";
  const [, drag] = useDrag(() => ({
    type: DragItemTypes.PLAYER,
    item: props,
  }));
  const fullName = `${name}`;

  return (
    <Tooltip title={accountRole === AccountRole.Admin? common("build.edit.title") : common("build.add.view")} placement="top" arrow>
    <Box>
      <Box
        key={UUID()}
        css={styles.player(isClickable, status)}
        onClick={onClick && isAccountRoleAllowed(accountRole, "ClickPlayer") ? onClick : () => window.open(`${process.env.REACT_APP_DASHBOARD}/user.php?user=${name}`,"_blank")}
        ref={isClickable ? drag : undefined}
      >
        <Box css={styles.icons(showRole)}>
          {showRole && <WarcraftIcon src={IconProvider.getSpecRoleIcon(spec)} />}
          <WarcraftIcon
            title={`${common(`specs.${spec}`)} ${common(`classes.${class_name}`)}`}
            src={spec ? IconProvider.getSpecIcon(spec) : IconProvider.getClassIcon(class_name)}
          />
        </Box>
        <Box>
          <WarcraftIcon
            title={`${common(`races.${race}`)}`}
            src={IconProvider.getRaceIcon(race?? WarcraftPlayerRace.Human)}
          />
        </Box>
        <Typography css={[styles.name,{pointerEvents: "none"}]} title={fullName}>
          {fullName}
        </Typography>
        {main === name && group_id !== "roster"?
          <Tooltip title="Main" placement="top" arrow>
            <Star sx={{fontSize:"12px", justifySelf:"left"}} />
          </Tooltip>
          : <></>
        }
        {status === "tentative"? (<AttendanceIcon status={status} absence={context?.getPlayerAbsence(main?? name)} />): null}

        {alts.length > 0? (<Box onClick={(event) => {event.preventDefault(); event.stopPropagation(); setVisible(!visible);}}>
          {(!visible && !rosterVisible)? (<ArrowLeft></ArrowLeft>): (<ArrowDropDown></ArrowDropDown>)}
        </Box>) : null}

      </Box>
      {alts.length > 0 && (visible || rosterVisible) ? (
        <Box key={UUID()}>
          <></>
          {alts.sort((a,b) => a.name === alt? -1 : 1 || sortFunctions.DEFAULT(a,b)).map((player:BuildPlayer) => (
            <Player
              key={UUID()}
              {...player}
              {...({onClick: () => context?.editPlayer(player)})}
              accountRole={accountRole}
              raid={raid}
            />
          ))}
        </Box>) : null}
    </Box>
    </Tooltip>
  );
};

export default Player;
