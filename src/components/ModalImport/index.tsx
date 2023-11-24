/** @jsxImportSource @emotion/react */
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { createRef, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { BuildHelper } from "../../utils/BuildHelper";
import { useAppContext } from "../App/context";
import useStyles from "./useStyles";

export interface ModalImportProps {}

const ModalImport: FC<ModalImportProps> = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const appContext = useAppContext();
  const [disabled] = useState(false);
  let importTextarea = createRef<HTMLTextAreaElement>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleImport = () => {
    BuildHelper.parseRaidHelper(importTextarea.current?.value ?? "").then((build) => {
      for(const player of build){
        appContext?.importPlayer(player);
      }
    })
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={common("cta.importBuild")} placement="top" arrow>
        <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
          <SystemUpdateAltIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.import.title")}</h2>
          <textarea css={styles.textarea} disabled={disabled} ref={importTextarea}></textarea>
          <br />
          <Box css={styles.buttons}>
            <Button color="primary" variant="contained" onClick={handleImport} disabled={disabled}>
              {common("build.import.import")}
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose} disabled={disabled}>
              {common("buttons.cancel")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalImport;
