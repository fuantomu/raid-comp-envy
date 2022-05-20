/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import Player from "../Player";
import useStyles from "./useStyles";

export interface CompositionGroupProps {
  players: BuildPlayer[];
  groupId: GroupId;
  spread?: boolean;
  editing?: boolean;
}

const CompositionGroup: FC<CompositionGroupProps> = ({
  groupId,
  players = [],
  spread = false,
  editing,
}) => {
  const styles = useStyles(spread);
  const [common] = useTranslation("common");
  const context = useAppContext();

  if (players.length === 0 && !editing) {
    return <></>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">
          {common("build.groups.group_each", { groupId: groupId.toString() })}
        </Typography>
        <Box css={styles.spread}>
          {players.map((player) => (
            <Player
              key={UUID()}
              {...player}
              showRole
              onClick={() => {
                if (editing) {
                  context?.editPlayer(player);
                }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompositionGroup;
