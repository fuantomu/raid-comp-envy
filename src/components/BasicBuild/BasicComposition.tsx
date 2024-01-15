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
  name: string;
  visible?: boolean;
  accountRole: number;
}

const BasicComposition: FC<BasicCompositionProps> = ({ players, raid, name, visible, accountRole }) => {
  const styles = useStyles();
  return (
    <>
      <Box key={UUID()} css={styles.grouped}>
        <BasicGroup
          key={UUID()}
          players={players}
          raid={raid}
          name={name}
          visible={visible}
          accountRole={accountRole}
        />
      </Box>
    </>
  );
};

export default BasicComposition;
