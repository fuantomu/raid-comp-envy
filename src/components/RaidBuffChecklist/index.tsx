/** @jsxImportSource @emotion/react */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { RoleProvider } from "../../utils/RoleProvider";
import { WarcraftRaidBuff } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import RaidBuff from "../RaidBuff";
import UtilityInfoBadge from "../UtilityInfoBadge";
import useInfoBadgeStyles from "../UtilityInfoBadge/useStyles";

export interface RaidBuffChecklistProps {
  build: Build;
}

const buildBuffChecklist = (build: Build) => {
  const raidBuffs = [];
  for (const buff in WarcraftRaidBuff) {
    const playersWithBuff = build.players.filter(
      ({ spec, class: className, group }) =>
        group !== 'roster' &&
        (RoleProvider.getSpecBuffs(spec).includes(buff as WarcraftRaidBuff) ||
        RoleProvider.getClassBuff(className).includes(buff as WarcraftRaidBuff))
    );
    raidBuffs.push(
      <RaidBuff key={UUID()} buff={buff as WarcraftRaidBuff} players={playersWithBuff} />
    );
  }
  return raidBuffs;
};

const RaidBuffChecklist: FC<RaidBuffChecklistProps> = ({ build }) => {
  const [common] = useTranslation("common");
  const infoBadgeStyles = useInfoBadgeStyles();

  return (
    <Card>
      <CardContent css={infoBadgeStyles.container}>
        <UtilityInfoBadge />
        <Typography variant="subtitle1">{common("build.checklist.buffs")}</Typography>
        {buildBuffChecklist(build)}
      </CardContent>
    </Card>
  );
};

export default RaidBuffChecklist;
