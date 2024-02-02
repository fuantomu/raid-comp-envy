/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import GroupsComposition from "./GroupsComposition";
import RolesComposition from "./RolesComposition";

export interface RaidCompositionProps {
  players: BuildPlayer[];
  grouped?: boolean;
  manager: any;
  raid: number;
  accountRole: number;
}

const RaidComposition: FC<RaidCompositionProps> = ({
  players,
  grouped,
  manager,
  raid,
  accountRole
}) => {
  return (
    <DndProvider manager={manager}>
      {grouped ? (
        <GroupsComposition raid={raid} players={players} accountRole={accountRole} />
      ) : (
        <RolesComposition raid={raid} players={players} accountRole={accountRole} />
      )}
    </DndProvider>
  );
};

export default RaidComposition;
