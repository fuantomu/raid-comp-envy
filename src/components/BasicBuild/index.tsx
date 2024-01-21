/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import BasicComposition from "./BasicComposition";

export interface BasicProps {
  players: BuildPlayer[];
  raid: number;
  manager: any;
  accountRole: number;
}

const BasicBuild: FC<BasicProps> = ({
  players,
  raid,
  manager,
  accountRole
}) => {

  return (
    <DndProvider manager={manager}>
      <BasicComposition players={players} raid={raid} accountRole={accountRole} />
    </DndProvider>
  );
};

export default BasicBuild;
