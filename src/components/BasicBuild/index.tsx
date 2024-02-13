/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import { Box } from "@mui/material";
import UUID from "../../utils/UUID";
import BasicGroup from "../BasicGroup";

export interface BasicProps {
  players: BuildPlayer[];
  raid: string;
  manager: any;
}

const BasicBuild: FC<BasicProps> = ({ players, raid, manager }) => {
  return (
    <DndProvider manager={manager}>
      <Box sx={{ border: `1px solid black`, borderRadius: "0px 0px 5px 5px" }} key={UUID()}>
        <BasicGroup key={UUID()} players={players} raid={raid} />
      </Box>
    </DndProvider>
  );
};

export default BasicBuild;
