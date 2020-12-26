/** @jsxImportSource @emotion/react */
import { Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import UUID from "../../utils/UUID";
import Player from "../Player";

export interface CompositionGroupProps {
  players: BuildPlayer[];
  groupId: number;
}

const buildGroupPlayers = (players: BuildPlayer[]) => {
  return players.map((player) => <Player key={UUID()} {...player} showRole />);
};

const CompositionGroup: FC<CompositionGroupProps> = ({ groupId, players }) => {
  const [common] = useTranslation("common");

  if (players.length === 0) {
    return <></>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{common("build.groups.group", { groupId })}</Typography>
        {buildGroupPlayers(players)}
      </CardContent>
    </Card>
  );
};

export default CompositionGroup;
