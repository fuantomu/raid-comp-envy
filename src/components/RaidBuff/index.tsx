/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import UUID from "../../utils/UUID";

export interface RaidBuffProps {
  buff: WarcraftRaidBuff;
  players: BuildPlayer[];
  version: string;
}

const buildBuffSpeclist = (buff: WarcraftRaidBuff, version: string) => {
  const specs = [];
  const classes = {};
  for (const spec in WarcraftPlayerSpec) {
    if (
      RoleProvider.getSpecBuffs(spec as WarcraftPlayerSpec, version).includes(
        buff as WarcraftRaidBuff
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

const RaidBuff: FC<RaidBuffProps> = ({ buff, players, version }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`buff.${buff}`)}
      iconSource={IconProvider.getBuffIcon(buff)}
      players={players}
      list={buildBuffSpeclist(buff, version)}
      source={buff}
      key={UUID()}
    />
  );
};

export default RaidBuff;
