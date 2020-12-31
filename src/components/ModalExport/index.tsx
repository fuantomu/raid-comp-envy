/** @jsxImportSource @emotion/react */
import { Box, Button, Modal } from "@material-ui/core";
import { FC, MouseEvent, useState } from "react";
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from "../ModalImport/useStyles";
import { useTranslation } from "react-i18next";
import { Build } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";

export interface ModalExportProps {
  build: Build
}

const ModalExport: FC<ModalExportProps> = ({build}) => {
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
  }

  return (
    <>
      <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
        <PublishIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.export.title")}</h2>
          <textarea css={styles.textarea} readOnly={true} onClick={handleTextareaClick}>
            {BuildHelper.generateExport(build)}
          </textarea>
        </Box>
      </Modal>
    </>
  );
};

export default ModalExport;
