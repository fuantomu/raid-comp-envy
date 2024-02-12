/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerRace } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import { Star } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

export interface SetupPlayerProps extends BuildPlayer {}

const SetupPlayer: FC<SetupPlayerProps> = (props) => {
  const [common] = useTranslation();
  const { name, class_name, spec, race, group_id, main } = props;
  const styles = useStyles(class_name);
  const fullName = `${name}`;

  return (
    <Box>
      <Box
        key={UUID()}
        css={styles.player(true)}
        onClick={() =>
          window.open(`${process.env.REACT_APP_DASHBOARD}/user.php?user=${name}`, "_blank")
        }
      >
        <Box>
          <WarcraftIcon
            css={styles.icons}
            title={`${common(`specs.${spec}`)} ${common(`classes.${class_name}`)}`}
            src={spec ? IconProvider.getSpecIcon(spec) : IconProvider.getClassIcon(class_name)}
          />
        </Box>
        <Box>
          <WarcraftIcon
            css={styles.icons}
            title={`${common(`races.${race}`)}`}
            src={IconProvider.getRaceIcon(race ?? WarcraftPlayerRace.Human)}
          />
        </Box>
        <Typography css={[styles.name, { pointerEvents: "none" }]} title={fullName}>
          {fullName}
        </Typography>
        {main === name && group_id !== "roster" ? (
          <Tooltip title="Main" placement="top" arrow>
            <Star sx={{ fontSize: "12px", justifySelf: "left" }} />
          </Tooltip>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default SetupPlayer;
