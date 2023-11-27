/** @jsxImportSource @emotion/react */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidUtility } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import RaidUtility from "../RaidUtility";
import UtilityInfoBadge from "../UtilityInfoBadge";
import useInfoBadgeStyles from "../UtilityInfoBadge/useStyles";

export interface RaidUtilityChecklistProps {
  build: Build;
  version: String;
}

const buildUtilityChecklist = (build: Build, version: String) => {
  const raidBuffs = [];
  for (const utility in RoleProvider.getVersionRaidUtility(version)) {
    const playersWithUtility = build.players.filter(
      ({ spec, class: className, race: raceName, group }) =>
        group !== 'roster' && group !== 'bench' &&
        (RoleProvider.getSpecUtilities(spec, version).includes(utility as WarcraftRaidUtility) ||
        RoleProvider.getClassUtilities(className, version).includes(utility as WarcraftRaidUtility) ||
        RoleProvider.getRaceUtilities(raceName, version).includes(utility as WarcraftRaidUtility))
    );
    raidBuffs.push(
      <RaidUtility
        key={UUID()}
        utility={utility as WarcraftRaidUtility}
        players={playersWithUtility}
        version={version}
      />
    );
  }
  return raidBuffs;
};

const RaidUtilityChecklist: FC<RaidUtilityChecklistProps> = ({ build, version }) => {
  const [common] = useTranslation("common");
  const infoBadgeStyles = useInfoBadgeStyles();
  return (
    <Card>
      <CardContent css={infoBadgeStyles.container}>
        <UtilityInfoBadge />
        <Typography variant="subtitle1">{common("build.checklist.utilities")}</Typography>
        {buildUtilityChecklist(build, version)}
      </CardContent>
    </Card>
  );
};

export default RaidUtilityChecklist;
