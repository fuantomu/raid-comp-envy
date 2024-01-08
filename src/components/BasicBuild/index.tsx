/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import BasicComposition from "./BasicComposition";

export interface BasicProps {
  players: BuildPlayer[];
  raid: number;
  name: string;
  visible?: boolean;
  manager: DragDropManager;
}

const BasicBuild: FC<BasicProps> = ({
  players,
  raid,
  name,
  visible,
  manager
}) => {

  return (
    <DndProvider manager={manager}>
      <BasicComposition players={players} raid={raid} name={name} visible={visible} />
    </DndProvider>
  );
};

export default BasicBuild;
