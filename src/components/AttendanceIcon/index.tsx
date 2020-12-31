/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { InviteStatus } from "../../consts";
import HelpIcon from "@material-ui/icons/Help";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
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

    case InviteStatus.Unknown:
    default:
      return <HelpIcon titleAccess={common(`status.${status}`)} />;
  }
};

export default AttendanceIcon;
