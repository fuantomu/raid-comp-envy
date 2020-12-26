/** @jsxImportSource @emotion/react */
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import Player from "../Player";
import useStyles from "./useStyles";

export interface CompositionGroupProps {
  players: BuildPlayer[];
  groupId: GroupId;
  spread?: boolean;
}

const buildGroupPlayers = (players: BuildPlayer[]) => {
  return players.map((player) => <Player key={UUID()} {...player} showRole />);
};

const CompositionGroup: FC<CompositionGroupProps> = ({ groupId, players, spread = false }) => {
  const styles = useStyles(spread);
  const [common] = useTranslation("common");

  if (players.length === 0) {
    return <></>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{common("build.groups.group_each", { groupId })}</Typography>
        <Box css={styles.spread}>
          {buildGroupPlayers(players)}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompositionGroup;
