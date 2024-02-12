/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { BuildPlayer } from "../../types";
import SetupGroup from "./SetupGroup";
import { Box, Typography } from "@mui/material";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import { BuildHelper } from "../../utils/BuildHelper";

export interface SetupProps {
  players: BuildPlayer[];
  name: string;
  date: number;
  instance: string;
}

const SetupBuild: FC<SetupProps> = ({ players, name, date, instance }) => {
  const styles = useStyles();
  const groups = BuildHelper.getGroups(players);
  return (
    <Box margin={"8px"}>
      <Typography
        style={{
          caretColor: "transparent",
          userSelect: "none",
          fontSize: "16px"
        }}
        variant="subtitle1"
      >
        {`${name}, ${new Date(date).toLocaleString("de-DE", {
          weekday: "long"
        })} - ${new Date(date).toLocaleString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })} - ${instance}`}
      </Typography>

      <Box key={UUID()} css={styles.grouped}>
        {Object.values(groups).map((group) => {
          if (!group) return <></>;
          const { group_id, players } = group;
          return <SetupGroup key={UUID()} group_id={group_id} players={players} />;
        })}
      </Box>
    </Box>
  );
};

export default SetupBuild;
