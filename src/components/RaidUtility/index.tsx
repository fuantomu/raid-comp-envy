/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "../../consts";
import UUID from "../../utils/UUID";

export interface RaidUtilityProps {
  utility: WarcraftRaidUtility;
  players: BuildPlayer[];
  version: string;
}

const buildUtilityList = (utility: WarcraftRaidUtility, version: string) => {
  const specs = [];
  const classes = {};
  for (const spec in WarcraftPlayerSpec) {
    if (
      RoleProvider.getSpecUtilities(spec as WarcraftPlayerSpec, version).includes(
        utility as WarcraftRaidUtility
      )
    ) {
      specs.push(spec as WarcraftPlayerSpec);
      const class_name = spec.toString().match(/[A-Z][a-z]+/g)[0] as WarcraftPlayerClass;
      if (!Object.keys(classes).includes(class_name)) {
        classes[class_name] = 0;
      }
      classes[class_name] += 1;
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
  return { specs: specs, classes: classes };
};

const RaidUtility: FC<RaidUtilityProps> = ({ utility, players, version }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`utility.${utility}`)}
      iconSource={IconProvider.getUtilityIcon(utility)}
      players={players}
      list={buildUtilityList(utility, version)}
      source={utility}
      key={UUID()}
    />
  );
};

export default RaidUtility;
