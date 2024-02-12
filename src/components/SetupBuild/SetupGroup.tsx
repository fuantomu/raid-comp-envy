/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FC } from "react";
import { BuildPlayer, GroupId } from "../../types";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import { Typography } from "@mui/material";
import SetupPlayer from "../SetupPlayer";
import { useTranslation } from "react-i18next";

export interface SetupGroupProps {
  players: BuildPlayer[];
  group_id: GroupId;
}

const SetupGroup: FC<SetupGroupProps> = ({ players = [], group_id }) => {
  const [common] = useTranslation("common");
  return (
    <Card sx={{ border: "1px solid black" }}>
      <CardContent sx={{ margin: "-12px" }}>
        <Box display={"grid"} gridTemplateColumns={"1fr auto"}>
          <Typography style={{ caretColor: "transparent", userSelect: "none" }} variant="subtitle1">
            {common("build.groups.group_each", { group_id: group_id.toString() })}
          </Typography>
        </Box>
        <Box>
          {players.length > 0 ? (
            players.map((player) => <SetupPlayer key={UUID()} {...player} />)
          ) : (
            <Typography
              style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
              variant="subtitle2"
            >
              Empty
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SetupGroup;
