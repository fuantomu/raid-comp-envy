/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidDebuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import UUID from "../../utils/UUID";

export interface RaidDebuffProps {
  debuff: WarcraftRaidDebuff;
  players: BuildPlayer[];
  version: string;
}

const buildDebuffSpeclist = (debuff: WarcraftRaidDebuff, version: string) => {
  const specs = [];
  const classes = {};
  for (const spec in WarcraftPlayerSpec) {
    if (
      RoleProvider.getSpecDebuffs(spec as WarcraftPlayerSpec, version).includes(
        debuff as WarcraftRaidDebuff
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
  return { specs: specs, classes: classes };
};

const RaidDebuff: FC<RaidDebuffProps> = ({ debuff, players, version }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`utility.${debuff}`)}
      iconSource={IconProvider.getDebuffIcon(debuff)}
      players={players}
      list={buildDebuffSpeclist(debuff, version)}
      source={debuff}
      key={UUID()}
    />
  );
};

export default RaidDebuff;
