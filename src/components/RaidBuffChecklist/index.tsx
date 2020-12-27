/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Build } from "../../types";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import RaidBuff from "../RaidBuff";
import { RoleProvider } from "../../utils/RoleProvider";
import UUID from "../../utils/UUID";

export interface RaidBuffChecklistProps {
  build: Build;
}

const buildBuffChecklist = (build: Build) => {
  const raidBuffs = [];
  for (const buff in WarcraftRaidBuff) {
    const playersWithBuff = build.players.filter(({ spec }) =>
      RoleProvider.getSpecBuffs(spec).includes(buff as WarcraftRaidBuff)
    );
    raidBuffs.push(
      <RaidBuff key={UUID()} buff={buff as WarcraftRaidBuff} players={playersWithBuff} />
    );
  }
  return raidBuffs;
};

const RaidBuffChecklist: FC<RaidBuffChecklistProps> = ({ build }) => {
  const [common] = useTranslation("common");
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{common("build.checklist.buffs")}</Typography>
        {buildBuffChecklist(build)}
      </CardContent>
    </Card>
  );
};

export default RaidBuffChecklist;
