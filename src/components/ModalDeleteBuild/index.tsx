/** @jsxImportSource @emotion/react */
import { Box, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button";
import { FC, createRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import useStyles from "./useStyles";


export interface ModalDeleteBuildProps {}

const ModalDeleteBuild: FC<ModalDeleteBuildProps> = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const context = useAppContext();

  const handleDelete = async () => {
    console.log("Deleting build "+context?.getCurrentBuild().name);
    context?.deleteBuild(context?.getCurrentBuild().name);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={common("cta.deleteBuild")} placement="top" arrow>
        <Button color="error" variant="contained" size="large" onClick={handleOpen}>
          <FolderDeleteIcon />
        </Button>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.delete.title")}</h2>
          {common("build.delete.confirm") + "'" + context?.getCurrentBuild().name + "'?"}
          <br />
          <Box css={styles.buttons}>
            <Button color="primary" variant="contained" onClick={handleDelete}>
              {common("build.delete.ok")}
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

export default ModalDeleteBuild;
