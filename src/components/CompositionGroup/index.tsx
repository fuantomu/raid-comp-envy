import { FC } from "react";
import { BuildPlayer } from "../../types";
import Player from "../Player";

export interface CompositionGroupProps {
  players: BuildPlayer[];
  groupId: number;
}

const CompositionGroup: FC<CompositionGroupProps> = (props) => {
  const { players } = props;

  return (
    <>
      {players.map((player) => (
        <Player {...player} showRole />
      ))}
    </>
  );
};

export default CompositionGroup;
