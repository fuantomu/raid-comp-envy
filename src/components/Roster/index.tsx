/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Build } from "../../types";
import RosterComposition from "./RosterComposition";

export interface RosterProps {
  build: Build;
  editing?: boolean;
}

const Roster: FC<RosterProps> = ({
  build: { players },
  editing = false,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RosterComposition players={players} editing={editing} />
    </DndProvider>
  );
};

export default Roster;
