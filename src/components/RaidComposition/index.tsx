/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Build } from "../../types";
import GroupsComposition from "./GroupsComposition";
import RolesComposition from "./RolesComposition";

export interface RaidCompositionProps {
  build: Build;
  grouped?: boolean;
  editing?: boolean;
}

const RaidComposition: FC<RaidCompositionProps> = ({
  build: { players },
  grouped,
  editing = false,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {grouped ? (
        <GroupsComposition players={players} editing={editing} />
      ) : (
        <RolesComposition players={players} editing={editing} />
      )}
    </DndProvider>
  );
};

export default RaidComposition;
