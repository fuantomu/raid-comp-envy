/** @jsxImportSource @emotion/react */
import { Box, Button, Modal } from "@material-ui/core";
import { createRef, FC, useRef, useState } from "react";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import useStyles from "./useStyles";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import { InviteStatus, WarcraftPlayerClass } from "../../consts";
import { BuildHelper } from "../../utils/BuildHelper";

export interface ModalImportProps {}

const ModalImport: FC<ModalImportProps> = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const appContext = useAppContext();
  const [disabled, setDisabled] = useState(false);
  let importTextarea = createRef<HTMLTextAreaElement>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleImport = () => {
    appContext?.importBuild(BuildHelper.parseImport(importTextarea.current?.value ?? ""));
    setOpen(false);
  };

  return (
    <>
      <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
        <SystemUpdateAltIcon />
      </Button>
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
