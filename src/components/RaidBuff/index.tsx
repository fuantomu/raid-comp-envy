/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import ChecklistItem from "../ChecklistItem";
import { WarcraftPlayerSpec } from "../../consts";

export interface RaidBuffProps {
  buff: WarcraftRaidBuff;
  players: BuildPlayer[];
}

const buildBuffSpeclist = (buff: WarcraftRaidBuff) => {
  const specs = [];
  for (const spec in WarcraftPlayerSpec) {
    if ((RoleProvider.getSpecBuffs(spec as WarcraftPlayerSpec).includes(buff as WarcraftRaidBuff))){
      specs.push(spec as WarcraftPlayerSpec)
    }
  }
  return specs;
};

const RaidBuff: FC<RaidBuffProps> = ({ buff, players }) => {
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      displayName={common(`buff.${buff}`)}
      iconSource={IconProvider.getBuffIcon(buff)}
      players={players}
      specs={buildBuffSpeclist(buff)}
    />
  );
};

export default RaidBuff;
