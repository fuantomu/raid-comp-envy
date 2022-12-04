/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";

export interface RaidBuffProps {
  buff: WarcraftRaidBuff;
  players: BuildPlayer[];
}

const RaidBuff: FC<RaidBuffProps> = ({ buff, players }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`buff.${buff}`)}
      iconSource={IconProvider.getBuffIcon(buff)}
      players={players}
    />
  );
};

export default RaidBuff;
