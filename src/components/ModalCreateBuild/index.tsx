/** @jsxImportSource @emotion/react */
import { Box, Input, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FC, createRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import useStyles from "./useStyles";
import { isAccountRoleAllowed } from "../../utils/AccountRole";

export interface ModalCreateBuildProps {
  build_id: number;
  accountRole: number;
}

const ModalCreateBuild: FC<ModalCreateBuildProps> = ({ build_id, accountRole }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [error, showError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [common] = useTranslation("common");
  const context = useAppContext();
  let buildTitle = createRef<HTMLInputElement>();

  const handleCreate = async () => {
    const currentTitle = buildTitle.current?.value ?? "";
    if (currentTitle.length === 0) {
      setErrorMessage("Name is empty");
      showError(true);
    } else {
      const builds = context?.getBuildSelections();
      if (builds) {
        context?.addBuild(currentTitle, build_id, true);
      }
    }
  };

  const handleClose = () => {
    showError(false);
    setOpen(false);
  };

  const handleOpen = () => {
    showError(false);
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={common("cta.createBuild")} placement="top" arrow>
        <span css={{ width: "31%" }}>
          <Button
            disabled={!isAccountRoleAllowed(accountRole, "CreateBuild")}
            color="success"
            variant="contained"
            size="large"
            onClick={handleOpen}
            css={{ width: "100%" }}
          >
            <CreateNewFolderIcon />
          </Button>
        </span>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.create.title")}</h2>
          <Box css={styles.content}>
            <Box css={styles.nameInputWrapper}>
              <Input
                css={styles.nameInput}
                type="text"
                placeholder={common("build.create.name")}
                inputRef={buildTitle}
              />
            </Box>
          </Box>
          <h4 style={{ color: "red" }}>{error ? errorMessage : null}</h4>
          <Box css={styles.buttons}>
            <Button color="success" variant="contained" onClick={handleCreate}>
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
