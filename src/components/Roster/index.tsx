/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { BuildPlayer } from "../../types";
import RosterComposition from "./RosterComposition";

export interface RosterProps {
  players: BuildPlayer[];
  editing?: boolean;
  manager: any;
  accountRole: number;
}

const Roster: FC<RosterProps> = ({
  players,
  editing = false,
  manager,
  accountRole
}) => {

  return (
    <DndProvider manager={manager}>
      <RosterComposition players={players} editing={editing} accountRole={accountRole} />
    </DndProvider>
  );
};

export default Roster;
