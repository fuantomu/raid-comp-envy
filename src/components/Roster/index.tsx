/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import RosterGroup from "../RosterGroup";

export interface RosterProps {
  players: BuildPlayer[];
  manager: any;
  version: string;
}

const Roster: FC<RosterProps> = ({ players, manager, version }) => {
  return (
    <DndProvider manager={manager}>
      <RosterGroup players={players} version={version} />
    </DndProvider>
  );
};

export default Roster;
