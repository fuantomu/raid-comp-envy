/** @jsxImportSource @emotion/react */

import Box from "@mui/material/Box";
import { FC } from "react";
import { Build } from "../../types";
import RaidBuffChecklist from "../RaidBuffChecklist";
import RaidClassChecklist from "../RaidClassChecklist";
import RaidUtilityChecklist from "../RaidUtilityChecklist";
import useStyles from "./useStyles";

export interface RaidChecklistProps {
  build: Build;
}

const RaidChecklist: FC<RaidChecklistProps> = ({ build }) => {
  const styles = useStyles();
  return (
    <Box css={styles.checklist}>
      <RaidClassChecklist build={build} />
      <RaidBuffChecklist build={build} />
      <RaidUtilityChecklist build={build} />
    </Box>
  );
};

export default RaidChecklist;
