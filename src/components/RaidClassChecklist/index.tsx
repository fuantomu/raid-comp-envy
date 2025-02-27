/** @jsxImportSource @emotion/react */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { Build } from "../../types";
import UUID from "../../utils/UUID";
import RaidClass from "../RaidClass";
import { RoleProvider } from "../../utils/RoleProvider";

export interface RaidClassChecklistProps {
  build: Build;
  version: string;
}

const buildClassChecklist = (build: Build, version: string) => {
  const class_names = [];
  for (const class_name in WarcraftPlayerClass) {
    if (!RoleProvider.getClassVersion(version).includes(class_name)){
      continue;
    }
    if (build.players.length > 0) {
      const playersWithClass = build.players.filter(
        (player) =>
          player.class_name === class_name &&
          player.group_id !== "roster" &&
          player.group_id !== "bench"
      );
      class_names.push(
        <RaidClass
          key={UUID()}
          class_name={class_name as WarcraftPlayerClass}
          players={playersWithClass}
        />
      );
    }
  }
  return class_names;
};

const RaidClassChecklist: FC<RaidClassChecklistProps> = ({ build, version }) => {
  const [common] = useTranslation("common");
  return (
    <Card sx={{ border: "1px solid black" }}>
      <CardContent>
        <Typography style={{ caretColor: "transparent" }} variant="subtitle1">
          {common("build.checklist.classes")}
        </Typography>
        {buildClassChecklist(build, version)}
      </CardContent>
    </Card>
  );
};

export default RaidClassChecklist;
