/** @jsxImportSource @emotion/react */
import { Box, Button, Modal } from "@material-ui/core";
import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "../ModalAlert/useStyles";

export enum ModalAlertResponse {
  OK,
  Cancel,
}

export interface ModalAlertProps {
  handleOpen: (callback: () => void) => void;
  title?: string;
  content?: ReactNode;
  cancelButton?: boolean;
  handleConfirm?: (response: ModalAlertResponse) => Promise<void> | void;
}

const ModalAlert: FC<ModalAlertProps> = ({
  handleOpen,
  content,
  title,
  handleConfirm,
  cancelButton,
}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");

  const handleClose = () => {
    setOpen(false);
  };

  handleOpen(() => {
    setOpen(true);
  });

  const handleOKCancel = (response: ModalAlertResponse) => {
    return async () => {
      if (handleConfirm) {
        await handleConfirm(response);
      }
      setOpen(false);
    };
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box css={styles.modal}>
        {title ? <h2>{title}</h2> : null}
        <Box css={styles.content}>{content}</Box>
        <Box css={styles.buttons}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOKCancel(ModalAlertResponse.OK)}
          >
            {common("buttons.ok")}
          </Button>
          {cancelButton ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={handleOKCancel(ModalAlertResponse.Cancel)}
            >
              {common("buttons.cancel")}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAlert;
