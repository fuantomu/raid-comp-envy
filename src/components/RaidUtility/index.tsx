/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  players: BuildPlayer[];
  version: string;
}

const buildUtilitySpeclist = (utility: WarcraftRaidUtility, version: string) => {
  const specs = [];
  for (const spec in WarcraftPlayerSpec) {
    if (
      RoleProvider.getSpecUtilities(spec as WarcraftPlayerSpec, version).includes(
        utility as WarcraftRaidUtility
      )
    ) {
      specs.push(spec as WarcraftPlayerSpec);
    }
  }
  for (const race in WarcraftPlayerRace) {
    if (
      RoleProvider.getRaceUtilities(race as WarcraftPlayerRace, version).includes(
        utility as WarcraftRaidUtility
      )
    ) {
      specs.push(race as WarcraftPlayerRace);
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
      source={utility}
    />
  );
};

export default RaidUtility;
