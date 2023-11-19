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

export interface ModalLoadRosterProps {}

const ModalLoadRoster: FC<ModalLoadRosterProps> = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [error, showError] = useState(false);
  const [common] = useTranslation("common");
  const appContext = useAppContext();
  const [disabled] = useState(false);
  let importTextarea = createRef<HTMLInputElement>();

  const handleClose = () => {
    showError(false)
    setOpen(false);
  };

  const handleOpen = () => {
    showError(false)
    setOpen(true);
  };

  const handleImport = () => {
    BuildHelper.parseRaidHelper(importTextarea.current?.value ?? "").then((roster) => {
      if(roster[0].name === "ErrorInvalidID"){
        showError(true)
      }
      else{
        appContext?.loadRoster(roster);
        showError(false)
        setOpen(false);
      }
    })
  };

  return (
    <>
      <Tooltip title={common("cta.importRoster")} placement="top" arrow>
        <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
          <SystemUpdateAltIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.import.roster")}</h2>
          <h3>Raid-helper ID</h3>
          <input disabled={disabled} ref={importTextarea}></input>
          <br />
          <h4 style={{ color: 'red' }}>{error ? "Incorrect ID": null }</h4>
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

export default ModalLoadRoster;
