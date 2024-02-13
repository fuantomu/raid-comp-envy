/** @jsxImportSource @emotion/react */
import { Avatar, AvatarProps } from "@mui/material";
import { FC } from "react";

export interface WarcraftIconProps extends AvatarProps {}

const WarcraftIcon: FC<WarcraftIconProps> = (props) => {
  return <Avatar {...props} variant="rounded" />;
};

export default WarcraftIcon;
