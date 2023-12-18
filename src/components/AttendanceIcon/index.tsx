/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { InviteStatus } from "../../consts";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ChairIcon from '@mui/icons-material/Chair';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { css } from "@emotion/react";
import useTheme from "../../utils/useTheme";
import { useTranslation } from "react-i18next";
import { Absence } from "../../types";

export interface AttendanceIconProps {
  status: InviteStatus;
  absence?: Absence[];
}

const AttendanceIcon: FC<AttendanceIconProps> = ({ status, absence }) => {
  const [common] = useTranslation("common");
  const { palette } = useTheme();

  switch (status) {
    case InviteStatus.Invited:
      return (
        <InsertInvitationIcon
          titleAccess={common(`status.${status}`)}
          css={css`
            color: ${palette.info.main};
          `}
        />
      );

    case InviteStatus.Tentative:
      let absentString = "Absent from:\n"
      if(absence){
        const currentDate = new Date().getTime();
        const absentDates = absence.filter((absentTime) => absentTime.endDate >= currentDate)
        for(const absentDate of absentDates){
          absentString += `${new Date(absentDate.startDate).toLocaleDateString()} to ${new Date(absentDate.endDate).toLocaleDateString()}. Reason: ${absentDate.reason}\n`
        }
      }
      return (
        <CalendarTodayIcon
          titleAccess={absence?
            absentString:
            common(`status.${status}`)
          }
          css={css`
            color: ${palette.warning.main};
          `}
        />
      );

    case InviteStatus.Accepted:
      return (
        <EventAvailableIcon
          titleAccess={common(`status.${status}`)}
          css={css`
            color: ${palette.success.main};
          `}
        />
      );

    case InviteStatus.Declined:
      return (
        <EventBusyIcon
          titleAccess={common(`status.${status}`)}
          css={css`
            color: ${palette.error.main};
          `}
        />
      );

    case InviteStatus.Benched:
      return (
        <ChairIcon
          titleAccess={common(`status.${status}`)}
          css={css`
            color: ${palette.error.light};
          `}
        />
      );

    case InviteStatus.Backup:
      return (
        <ChangeCircleIcon
          titleAccess={common(`status.${status}`)}
          css={css`
            color: ${palette.success.light};
          `}
        />
      );

    case InviteStatus.Unknown:
    default:
      return <></>;
  }
};

export default AttendanceIcon;
