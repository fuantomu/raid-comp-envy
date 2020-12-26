/** @jsxImportSource @emotion/react */

import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { Build } from "../../types";
import RaidClass from "../RaidClass";

export interface RaidClassChecklistProps {
  build: Build;
}

const buildClassChecklist = (build: Build) => {
  const classNames = [];
  for (const className in WarcraftPlayerClass) {
    const playersWithClass = build.players.filter((player) => player.class === className);
    classNames.push(
      <RaidClass className={className as WarcraftPlayerClass} players={playersWithClass} />
    );
  }
  return classNames;
};

const RaidClassChecklist: FC<RaidClassChecklistProps> = ({ build }) => {
  const [common] = useTranslation("common");
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{common("build.checklist.classes")}</Typography>
        {buildClassChecklist(build)}
      </CardContent>
    </Card>
  );
};

export default RaidClassChecklist;
