/** @jsxImportSource @emotion/react */
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Tooltip } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./useStyles";

const UtilityInfoBadge: FC = () => {
  const styles = useStyles();
  const [common] = useTranslation("common");

  return (
    <>
      <Tooltip title={common("warn.talentBasedUtilities")} placement="top" arrow>
        <WarningAmberIcon css={styles.icon} color="warning" />
      </Tooltip>
    </>
  );
};

export default UtilityInfoBadge;
