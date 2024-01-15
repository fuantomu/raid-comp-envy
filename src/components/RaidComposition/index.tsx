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
  manager: any;
  raid: number;
  accountRole: number;
}

const RaidComposition: FC<RaidCompositionProps> = ({
  build: { players },
  grouped,
  editing = false,
  manager,
  raid,
  accountRole
}) => {
  return (
    <DndProvider manager={manager}>
      {grouped ? (
        <GroupsComposition raid={raid} players={players} editing={editing} accountRole={accountRole} />
      ) : (
        <RolesComposition raid={raid} players={players} editing={editing} accountRole={accountRole} />
      )}
    </DndProvider>
  );
};

export default RaidComposition;
