import { FC } from "react";
import { BuildPlayer } from "../../types";

export interface PlayerProps extends BuildPlayer {
  showRole?: boolean;
}

const Player: FC<PlayerProps> = (props) => {
  const { name, realm, group, class: playerClass, status, showRole } = props;

  return (
    <>
      <div>
        <div>{name}</div>
      </div>
    </>
  );
};

export default Player;
