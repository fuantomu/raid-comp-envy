/** @jsxImportSource @emotion/react */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidDebuff } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import RaidDebuff from "../RaidDebuff";
import UtilityInfoBadge from "../UtilityInfoBadge";
import useInfoBadgeStyles from "../UtilityInfoBadge/useStyles";

export interface RaidDebuffChecklistProps {
  build: Build;
  version: String;
}

const buildDebuffChecklist = (build: Build, version:String) => {
  const raidDebuffs = [];
  for (const debuff in RoleProvider.getVersionDebuffs(version)) {
    const playersWithDebuff = build.players.filter(
      ({ spec, class: className, group }) =>
        group !== 'roster' && group !== 'bench' &&
        (RoleProvider.getSpecDebuffs(spec, version).includes(debuff as WarcraftRaidDebuff) ||
        RoleProvider.getClassDebuff(className, version).includes(debuff as WarcraftRaidDebuff))
    );
    raidDebuffs.push(
      <RaidDebuff key={UUID()} debuff={debuff as WarcraftRaidDebuff} players={playersWithDebuff} version={version} />
    );
  }
  return raidDebuffs;
};

const RaidDebuffChecklist: FC<RaidDebuffChecklistProps> = ({ build, version }) => {
  const [common] = useTranslation("common");
  const infoBadgeStyles = useInfoBadgeStyles();

  return (
    <Card>
      <CardContent css={infoBadgeStyles.container}>
        <UtilityInfoBadge />
        <Typography variant="subtitle1">{common("build.checklist.debuffs")}</Typography>
        {buildDebuffChecklist(build, version)}
      </CardContent>
    </Card>
  );
};

export default RaidDebuffChecklist;
