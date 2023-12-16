/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { Build } from "../../types";
import GroupsComposition from "./GroupsComposition";
import RolesComposition from "./RolesComposition";

export interface RaidCompositionProps {
  build: Build;
  grouped?: boolean;
  editing?: boolean;
  manager: DragDropManager;
  raid: number;
}

const RaidComposition: FC<RaidCompositionProps> = ({
  build: { players },
  grouped,
  editing = false,
  manager,
  raid,
}) => {
  return (
    <DndProvider manager={manager}>
      {grouped ? (
        <GroupsComposition raid={raid} players={players} editing={editing} />
      ) : (
        <RolesComposition raid={raid} players={players} editing={editing} />
      )}
    </DndProvider>
  );
};

export default RaidComposition;
