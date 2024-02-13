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
  raid: string;
}

const RaidComposition: FC<RaidCompositionProps> = ({ players, grouped, manager, raid }) => {
  return (
    <DndProvider manager={manager}>
      {grouped ? (
        <GroupsComposition raid={raid} players={players} />
      ) : (
        <RolesComposition raid={raid} players={players} />
      )}
    </DndProvider>
  );
};

export default RaidComposition;
