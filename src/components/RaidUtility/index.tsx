/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  players: BuildPlayer[];
}

const RaidUtility: FC<RaidUtilityProps> = ({ utility, players }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`utility.${utility}`)}
      iconSource={IconProvider.getUtilityIcon(utility)}
      players={players}
    />
  );
};

export default RaidUtility;
