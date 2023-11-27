/** @jsxImportSource @emotion/react */

import Box from "@mui/material/Box";
import { FC } from "react";
import { Build } from "../../types";
import RaidBuffChecklist from "../RaidBuffChecklist";
import RaidDebuffChecklist from "../RaidDebuffChecklist";
import RaidClassChecklist from "../RaidClassChecklist";
import RaidUtilityChecklist from "../RaidUtilityChecklist";
import useStyles from "../ChecklistItem/useStyles";

export interface RaidChecklistProps {
  build: Build;
  version: String;
}

const RaidChecklist: FC<RaidChecklistProps> = ({ build, version }) => {
  const styles = useStyles();
  return (
    <Box css={styles.checklist}>
      <RaidClassChecklist build={build} />
      <RaidBuffChecklist build={build} version={version} />
      <RaidDebuffChecklist build={build} version={version}/>
      <RaidUtilityChecklist build={build} version={version}/>
    </Box>
  );
};

export default RaidChecklist;
