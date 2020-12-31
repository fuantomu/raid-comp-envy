/** @jsxImportSource @emotion/react */
import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import RaidUtility from "../RaidUtility";

export interface RaidUtilityChecklistProps {
  build: Build;
}

const buildUtilityChecklist = (build: Build) => {
  const raidBuffs = [];
  for (const utility in WarcraftRaidUtility) {
    const playersWithUtility = build.players.filter(({ spec, class: className }) =>
      RoleProvider.getSpecUtilities(spec).includes(utility as WarcraftRaidUtility) ||
      RoleProvider.getClassUtilities(className).includes(utility as WarcraftRaidUtility)
    );
    raidBuffs.push(
      <RaidUtility
        key={UUID()}
        utility={utility as WarcraftRaidUtility}
        players={playersWithUtility}
      />
    );
  }
  return raidBuffs;
};

const RaidUtilityChecklist: FC<RaidUtilityChecklistProps> = ({ build }) => {
  const [common] = useTranslation("common");
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{common("build.checklist.utilities")}</Typography>
        {buildUtilityChecklist(build)}
      </CardContent>
    </Card>
  );
};

export default RaidUtilityChecklist;
