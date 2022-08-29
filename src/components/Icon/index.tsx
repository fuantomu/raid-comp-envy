/** @jsxImportSource @emotion/react */
import { Avatar, AvatarProps } from "@mui/material";
import { FC } from "react";
import useStyles from "./useStyles";

export interface WarcraftIconProps extends AvatarProps {}

const WarcraftIcon: FC<WarcraftIconProps> = (props) => {
  const styles = useStyles();
  return <Avatar {...props} css={styles.icon} variant="rounded" />;
};

export default WarcraftIcon;
