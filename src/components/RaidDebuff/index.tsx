/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftRaidDebuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftPlayerSpec } from "../../consts";

export interface RaidDebuffProps {
  debuff: WarcraftRaidDebuff;
  players: BuildPlayer[];
  version: string;
}

const buildDebuffSpeclist = (debuff: WarcraftRaidDebuff, version: string) => {
  const specs = [];
  for (const spec in WarcraftPlayerSpec) {
    if (
      RoleProvider.getSpecDebuffs(spec as WarcraftPlayerSpec, version).includes(
        debuff as WarcraftRaidDebuff
      )
    ) {
      specs.push(spec as WarcraftPlayerSpec);
    }
  }
  return specs;
};

const RaidDebuff: FC<RaidDebuffProps> = ({ debuff, players, version }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`debuff.${debuff}`)}
      iconSource={IconProvider.getDebuffIcon(debuff)}
      players={players}
      specs={buildDebuffSpeclist(debuff, version)}
      source={debuff}
    />
  );
};

export default RaidDebuff;
