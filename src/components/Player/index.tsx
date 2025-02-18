/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useDrag } from "react-dnd";
import { useTranslation } from "react-i18next";
import { DragItemTypes, InviteStatus, WarcraftPlayerRace, WarcraftPlayerRole } from "../../consts";
import { Build, BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import { useAppContext } from "../App/context";
import {
  ArrowDropDown,
  ArrowLeft,
  GppBad,
  HealthAndSafety,
  LooksOne,
  LooksTwo,
  NoAccounts,
  Star
} from "@mui/icons-material";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import { Tooltip } from "@mui/material";
import { sortFunctions } from "../../utils/sorting";
import AbsenceTooltip from "../AbsenceTooltip";

export interface PlayerProps extends BuildPlayer {
  onClick?: () => void;
  alts?: BuildPlayer[];
  rosterVisible?: boolean;
  raid: string;
  basic?: boolean;
}

const Player: FC<PlayerProps> = (props) => {
  const [common] = useTranslation();
  const {
    name,
    class_name,
    spec,
    role,
    swap,
    status,
    race,
    group_id,
    raid,
    onClick,
    rosterVisible,
    alts = [],
    main,
    alt,
    basic
  } = props;
  const styles = useStyles(class_name);
  const context = useAppContext();
  const [visible, setVisible] = useState(false);
  const isClickable = typeof onClick != "undefined";
  const [, drag] = useDrag(() => ({
    type: DragItemTypes.PLAYER,
    item: props
  }));
  const fullName = `${name}`;

  const absences = [];

  if (group_id === "roster" && context?.getPlayerAbsence(main ?? name, 0).length > 0) {
    const lastReset = new Date().setDate(
      new Date().getDate() + ((3 - 7 - new Date().getDay()) % 7 || 7)
    );
    const lastRaid = context?.getBuilds().reduce(
      (a: any, b: any) => {
        return a?.date < b?.date ? a?.date : b?.date;
      },
      { date: new Date().getTime() } as Build
    );
    absences.push(...context?.getPlayerAbsence(main ?? name, Math.min(lastRaid, lastReset)));
  } else {
    absences.push(...context?.getPlayerAbsence(main ?? name, context.getRaid(raid).date));
  }

  return (
    <Tooltip
      title={
        status === InviteStatus.Tentative ? (
          <AbsenceTooltip
            absences={absences.sort((a, b) => b.start_date - a.start_date).slice(0, 10)}
          ></AbsenceTooltip>
        ) : (
          ""
        )
      }
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "transparent",
            color: "rgba(255, 255, 255, 0.87)",
            maxWidth: "800px"
          }
        }
      }}
      leaveDelay={50}
    >
      <Box>
        <Box
          key={UUID()}
          css={styles.player(isClickable, status, basic)}
          onClick={
            onClick && isAccountRoleAllowed(context.getAccountRole(), "ClickPlayer")
              ? onClick
              : () => window.open(`${process.env.REACT_APP_DASHBOARD}${name}`, "_blank")
          }
          ref={
            isClickable && isAccountRoleAllowed(context.getAccountRole(), "ClickPlayer")
              ? drag
              : undefined
          }
        >
          <Box>
            <WarcraftIcon
              css={styles.icons(basic)}
              title={`${common(`specs.${spec}`)} ${common(`classes.${class_name}`)}`}
              src={spec ? IconProvider.getSpecIcon(spec) : IconProvider.getClassIcon(class_name)}
            />
          </Box>
          <Box>
            <WarcraftIcon
              css={styles.icons(basic)}
              title={`${common(`races.${race}`)}`}
              src={IconProvider.getRaceIcon(race ?? WarcraftPlayerRace.Human)}
            />
          </Box>
          <Typography css={[styles.name(status), { pointerEvents: "none" }]} title={fullName}>
            {`${fullName}${status === InviteStatus.Benched ? " (Inactive) " : ""}`}
          </Typography>

          {main === name && group_id !== "roster" ? (
            <Tooltip title="Main" placement="top" arrow>
              <Star sx={{ fontSize: "12px", justifySelf: "left" }} />
            </Tooltip>
          ) : null}

          {role && role !== "None" && group_id !== "roster" ? (
            <Tooltip
              title={`${common(`roles.${role}`)} ${
                swap && swap !== spec && swap.includes(class_name)
                  ? ": " + common(`specs.${swap}`)
                  : ""
              }`}
              placement="top"
              arrow
            >
              {role === WarcraftPlayerRole.MainTank ? (
                <LooksOne sx={{ fontSize: "24px", justifySelf: "left" }} />
              ) : role === WarcraftPlayerRole.OffTank ? (
                <LooksTwo sx={{ fontSize: "24px", justifySelf: "left" }} />
              ) : role === WarcraftPlayerRole.OffDPS ? (
                <GppBad sx={{ fontSize: "24px", justifySelf: "left" }} />
              ) : role === WarcraftPlayerRole.OffHeal ? (
                <HealthAndSafety sx={{ fontSize: "24px", justifySelf: "left" }} />
              ) : (
                <NoAccounts sx={{ fontSize: "24px", justifySelf: "left" }} />
              )}
            </Tooltip>
          ) : null}

          {alts.length > 0 && status !== InviteStatus.Benched ? (
            <Box
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setVisible(!visible);
              }}
            >
              {!visible && !rosterVisible ? (
                <ArrowLeft></ArrowLeft>
              ) : (
                <ArrowDropDown></ArrowDropDown>
              )}
            </Box>
          ) : null}
        </Box>
        {alts.length > 0 && (visible || rosterVisible) && status !== InviteStatus.Benched ? (
          <Box key={UUID()}>
            <></>
            {alts
              .sort((a, b) => (a.name === alt ? -1 : 1 || sortFunctions.DEFAULT(a, b)))
              .map((player: BuildPlayer) => (
                <Player
                  key={UUID()}
                  {...player}
                  {...{ onClick: () => context?.editPlayer(player, true) }}
                  raid={raid}
                />
              ))}
          </Box>
        ) : null}
      </Box>
    </Tooltip>
  );
};

export default Player;
