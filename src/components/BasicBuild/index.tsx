/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import BasicComposition from "./BasicComposition";

export interface BasicProps {
  players: BuildPlayer[];
  raid: string;
  manager: any;
}

const BasicBuild: FC<BasicProps> = ({ players, raid, manager }) => {
  return (
    <DndProvider manager={manager}>
      <BasicComposition players={players} raid={raid} />
    </DndProvider>
  );
};

export default BasicBuild;
