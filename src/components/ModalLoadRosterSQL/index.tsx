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
  let sqlHost = createRef<HTMLInputElement>();
  let sqlDatabase = createRef<HTMLInputElement>();
  let sqlUser = createRef<HTMLInputElement>();
  let sqlPassword = createRef<HTMLInputElement>();

  const handleClose = () => {
    showError(false)
    setOpen(false);
  };

  const handleOpen = () => {
    showError(false)
    setOpen(true);
  };

  const handleImport = () => {
    const connectionString = `SERVER=${sqlHost.current?.value ?? "localhost"};PORT=3306;DATABASE=${sqlDatabase};UID=${sqlUser};PWD=${sqlPassword}`
    BuildHelper.parseSql(connectionString).then((roster) => {
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
      <Tooltip title={common("cta.importRoster.sql")} placement="top" arrow>
        <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
          <SystemUpdateAltIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.import.roster.sql")}</h2>
          <h3>Host name</h3>
          <input disabled={disabled} ref={sqlHost} defaultValue="localhost"></input>
          <h3>Database</h3>
          <input disabled={disabled} ref={sqlDatabase}></input>
          <h3>User name</h3>
          <input disabled={disabled} ref={sqlUser} defaultValue="root"></input>
          <h3>Password</h3>
          <input disabled={disabled} ref={sqlPassword} defaultValue="admin"></input>
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
