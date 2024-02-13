/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import { FC } from "react";
import { BuildPlayer } from "../../types";
import UUID from "../../utils/UUID";
import BasicGroup from "../BasicGroup";
import useStyles from "./useStyles";

interface BasicCompositionProps {
  players: BuildPlayer[];
  raid: string;
}

const BasicComposition: FC<BasicCompositionProps> = ({ players, raid }) => {
  const styles = useStyles();
  return (
    <>
      <Box
        sx={{ border: `1px solid black`, borderRadius: "0px 0px 5px 5px" }}
        key={UUID()}
        css={styles.grouped}
      >
        <BasicGroup key={UUID()} players={players} raid={raid} />
      </Box>
    </>
  );
};

export default BasicComposition;
