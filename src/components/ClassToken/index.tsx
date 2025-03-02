/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { BuildPlayer } from "../../types";
import useStyles from "./useStyles";
import { Box, Typography } from "@mui/material";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import { useTranslation } from "react-i18next";
import { IconProvider } from "../../utils/IconProvider";
import { CustomIcon } from "../../utils/IconProvider/consts";
import TooltipPlayers from "../TooltipPlayers";

export interface ClassTokenProps {
  token_name: string;
  players: BuildPlayer[];
  token_classes: string[];
}

const ClassToken: FC<ClassTokenProps> = ({ token_name, players, token_classes }) => {
  const count = players.length;
  const [common] = useTranslation("common");
  const styles = useStyles(count);

  return (
    <TooltipPlayers
      key={UUID()}
      players={players}
      list={{ specs: [], classes: {} }}
      source={token_name}
      displayName={common(`token.${token_name}`)}
    >
      <Box css={styles.container} key={UUID()}>
        <WarcraftIcon
          css={{ width: "24px", height: "24px" }}
          src={IconProvider.getCustomIcon(CustomIcon[token_name])}
        />
        <Typography css={styles.name}>{common(`token.${token_name}`)}</Typography>
        <Typography css={styles.classes}>{token_classes.join(",")}</Typography>
        <Typography css={styles.count} fontWeight="bold">
          {count}
        </Typography>
      </Box>
    </TooltipPlayers>
  );
};

export default ClassToken;
