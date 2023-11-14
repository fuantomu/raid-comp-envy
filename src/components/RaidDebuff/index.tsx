/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidDebuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";

export interface RaidDebuffProps {
  debuff: WarcraftRaidDebuff;
  players: BuildPlayer[];
}

const RaidDebuff: FC<RaidDebuffProps> = ({ debuff, players }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`debuff.${debuff}`)}
      iconSource={IconProvider.getDebuffIcon(debuff)}
      players={players}
    />
  );
};

export default RaidDebuff;
