/** @jsxImportSource @emotion/react */
import { Box, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button";
import { FC, createRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import useStyles from "./useStyles";


export interface ModalCreateBuildProps {
  buildId: number
}

const ModalCreateBuild: FC<ModalCreateBuildProps> = ({buildId}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [error, showError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [common] = useTranslation("common");
  const context = useAppContext();
  let buildTitle = createRef<HTMLInputElement>();

  const handleCreate = async () => {
    const currentTitle = buildTitle.current?.value?? "";
    if(currentTitle.length === 0){
      setErrorMessage("Name is empty")
      showError(true)
    }
    else{
      const builds = context?.getBuilds();
      if (builds) {
        const otherBuilds = builds.find((build) => build.label === currentTitle)
        if(otherBuilds){
          setErrorMessage("Build already exists")
          showError(true);
        }
        else{
          console.log("Adding build "+currentTitle);
          context?.addBuild(currentTitle,buildId);
        }
      }
    }

  };


  const handleClose = () => {
    showError(false)
    setOpen(false);
  };

  const handleOpen = () => {
    showError(false)
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={common("cta.createBuild")} placement="top" arrow>
        <Button color="success" variant="contained" size="large" onClick={handleOpen}>
          <CreateNewFolderIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.create.title")}</h2>
          <input ref={buildTitle}></input>
          <br />
          <h4 style={{ color: 'red' }}>{error ? errorMessage : null }</h4>
          <Box css={styles.buttons}>
            <Button color="primary" variant="contained" onClick={handleCreate}>
              {common("build.create.save")}
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              {common("buttons.cancel")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalCreateBuild;
