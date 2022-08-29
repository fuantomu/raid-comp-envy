/** @jsxImportSource @emotion/react */
import { FC } from "react";
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
  return grouped ? (
    <GroupsComposition players={players} editing={editing} />
  ) : (
    <RolesComposition players={players} editing={editing} />
  );
};

export default RaidComposition;
