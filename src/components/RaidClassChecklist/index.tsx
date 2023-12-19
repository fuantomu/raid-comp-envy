/** @jsxImportSource @emotion/react */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass} from "../../consts";
import { Build } from "../../types";
import UUID from "../../utils/UUID";
import RaidClass from "../RaidClass";

export interface RaidClassChecklistProps {
  build: Build;
}

const buildClassChecklist = (build: Build) => {
  const classNames = [];
  for (const className in WarcraftPlayerClass) {
    if(build.players.length > 0){
      const playersWithClass = build.players.filter((player) => player.className === className && player.group !== 'roster' && player.group !== 'bench');
      classNames.push(
        <RaidClass
          key={UUID()}
          className={className as WarcraftPlayerClass}
          players={playersWithClass}
        />
      );
    }
  }
  return classNames;
};

const RaidClassChecklist: FC<RaidClassChecklistProps> = ({ build }) => {
  const [common] = useTranslation("common");
  return (
    <Card>
      <CardContent>
        <Typography style={{caretColor: "transparent"}} variant="subtitle1">{common("build.checklist.classes")}</Typography>
        {buildClassChecklist(build)}
      </CardContent>
    </Card>
  );
};

export default RaidClassChecklist;
