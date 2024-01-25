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
  version: string;
}

const buildBuffChecklist = (build: Build, version: string) => {
  const raidBuffs = [];
  for (const buff in RoleProvider.getVersionBuffs(version)) {
    if (build.players.length > 0) {
      const playersWithBuff = build.players.filter(
        ({ spec, class_name, group_id }) =>
          group_id !== "roster" &&
          group_id !== "bench" &&
          (RoleProvider.getSpecBuffs(spec, version).includes(buff as WarcraftRaidBuff) ||
            RoleProvider.getClassBuff(class_name, version).includes(buff as WarcraftRaidBuff))
      );
      raidBuffs.push(
        <RaidBuff
          key={UUID()}
          buff={buff as WarcraftRaidBuff}
          players={playersWithBuff}
          version={version}
        />
      );
    }
  }
  return raidBuffs;
};

const RaidBuffChecklist: FC<RaidBuffChecklistProps> = ({ build, version }) => {
  const [common] = useTranslation("common");
  const infoBadgeStyles = useInfoBadgeStyles();

  return (
    <Card>
      <CardContent css={infoBadgeStyles.container}>
        <UtilityInfoBadge />
        <Typography style={{ caretColor: "transparent" }} variant="subtitle1">
          {common("build.checklist.buffs")}
        </Typography>
        {buildBuffChecklist(build, version)}
      </CardContent>
    </Card>
  );
};

export default RaidBuffChecklist;
