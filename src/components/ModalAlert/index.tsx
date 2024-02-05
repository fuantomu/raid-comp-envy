/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "../ModalAlert/useStyles";
import { useAppContext } from "../App/context";

export enum ModalAlertResponse {
  OK,
  Cancel
}

export interface ModalAlertProps {
  handleOpen: (callback: (props?: any) => void) => void;
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
  cancelButton
}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const [boxContent, setContent] = useState(content);
  const [boxTitle, setTitle] = useState(title);
  const context = useAppContext();
  const [continuePlayer, setContinuePlayer] = useState();
  const [swap, setSwap] = useState(false);
  const [oldRaid, setOldRaid] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  handleOpen((props?: any) => {
    if (props) {
      if (props.params) {
        for (const param in props.params) {
          if (param === "continue") {
            setContinuePlayer(props.params[param]);
          } else if (param === "swap") {
            setSwap(props.params[param]);
          } else if (param === "oldRaid") {
            setOldRaid(props.params[param]);
          } else {
            props.content = props.content.replace(`$${param.toUpperCase()}`, props.params[param]);
          }
        }
      }
      setContent(props.content);
      setTitle(props.title);
    }
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

  const handleContinue = (response: ModalAlertResponse) => {
    return async () => {
      if (continuePlayer) {
        context.importPlayer(continuePlayer, true, oldRaid, swap);
      }
      setOpen(false);
    };
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box css={styles.modal}>
        {boxTitle ? <h2>{boxTitle}</h2> : null}
        <Box css={styles.content}>{boxContent}</Box>
        <Box css={styles.buttons}>
          {continuePlayer ? (
            <Button
              color="warning"
              variant="contained"
              onClick={handleContinue(ModalAlertResponse.OK)}
            >
              {common("buttons.continue")}
            </Button>
          ) : (
            <></>
          )}

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
