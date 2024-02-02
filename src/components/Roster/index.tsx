/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import RosterGroup from "../RosterGroup";

export interface RosterProps {
  players: BuildPlayer[];
  manager: any;
}

const Roster: FC<RosterProps> = ({ players, manager }) => {
  return (
    <DndProvider manager={manager}>
      <RosterGroup players={players} />
    </DndProvider>
  );
};

export default Roster;
