/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { InviteStatus } from "../../consts";
import HelpIcon from "@mui/icons-material/Help";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ChairIcon from '@mui/icons-material/Chair';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { css } from "@emotion/react";
import useTheme from "../../utils/useTheme";
import { useTranslation } from "react-i18next";

export interface AttendanceIconProps {
  status: InviteStatus;
}

const AttendanceIcon: FC<AttendanceIconProps> = ({ status }) => {
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
      return (
        <CalendarTodayIcon
          titleAccess={common(`status.${status}`)}
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
      return <HelpIcon titleAccess={common(`status.${status}`)} />;
  }
};

export default AttendanceIcon;
