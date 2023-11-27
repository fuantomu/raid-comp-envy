/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftPlayerSpec } from "../../consts";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  players: BuildPlayer[];
  version: String;
}

const buildUtilitySpeclist = (utility: WarcraftRaidUtility, version: String) => {
  const specs = [];
  for (const spec in WarcraftPlayerSpec) {
    if ((RoleProvider.getSpecUtilities(spec as WarcraftPlayerSpec, version).includes(utility as WarcraftRaidUtility))){
      specs.push(spec as WarcraftPlayerSpec)
    }
  }
  return specs;
};

const RaidUtility: FC<RaidUtilityProps> = ({ utility, players, version }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`utility.${utility}`)}
      iconSource={IconProvider.getUtilityIcon(utility)}
      players={players}
      specs={buildUtilitySpeclist(utility, version)}
    />
  );
};

export default RaidUtility;
