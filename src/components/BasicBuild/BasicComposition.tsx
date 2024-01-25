/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import UUID from "../../utils/UUID";
import BasicGroup from "../BasicGroup";
import useStyles from "./useStyles";

interface BasicCompositionProps {
  players: BuildPlayer[];
  raid: number;
  accountRole: number;
}

const BasicComposition: FC<BasicCompositionProps> = ({ players, raid, accountRole }) => {
  const styles = useStyles();
  return (
    <>
      <Box sx={{ border: `1px solid black` }} key={UUID()} css={styles.grouped}>
        <BasicGroup key={UUID()} players={players} raid={raid} accountRole={accountRole} />
      </Box>
    </>
  );
};

export default BasicComposition;
