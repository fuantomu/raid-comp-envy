/** @jsxImportSource @emotion/react */
import PublishIcon from "@mui/icons-material/Publish";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import { FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import { PlayerUtils } from "../../utils/PlayerUtils";
import useStyles from "../ModalImport/useStyles";

export interface ModalExportProps {
  build: Build;
}

const ModalExport: FC<ModalExportProps> = ({ build }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleTextareaClick = (event: MouseEvent<HTMLTextAreaElement>) => {
    event.currentTarget.select();
  };

  return (
    <>
      <Tooltip title={common("cta.exportBuild")} placement="top" arrow>
        <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
          <PublishIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.export.title")}</h2>
          <p>{common("build.export.raid-comp")}</p>
          <textarea
            css={styles.textarea}
            readOnly={true}
            onClick={handleTextareaClick}
            value={BuildHelper.generateExport(build)}
          ></textarea>
          <p>
            <Link
              href="https://www.curseforge.com/wow/addons/wowaudit-invite-tool"
              target="_blank"
              rel="noopener"
              color="textPrimary"
            >
              {common("build.export.wowaudit")}
            </Link>
          </p>
          <textarea
            css={styles.textarea}
            readOnly={true}
            onClick={handleTextareaClick}
            value={build.players.map(PlayerUtils.getFullName).join(";")}
          ></textarea>
        </Box>
      </Modal>
    </>
  );
};

export default ModalExport;
