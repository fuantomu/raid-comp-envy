/** @jsxImportSource @emotion/react */
import { FC } from "react";

import envy from "../../icons/envy-master.png";
import useStyles from "./useStyles";

export type Props = {};

const Logo: FC<Props> = () => {
  const styles = useStyles();
  return (
    <div css={styles.base}>
      <img draggable={false} alt="Envy" src={envy}></img>
    </div>
  );
};

export default Logo;
