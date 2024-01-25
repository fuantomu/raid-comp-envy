/** @jsxImportSource @emotion/react */
import { Box, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import useStyles from "./useStyles";
import { isAccountRoleAllowed } from "../../utils/AccountRole";

export interface ModalDeleteBuildProps {
  id: string;
  accountRole: number;
}

const ModalDeleteBuild: FC<ModalDeleteBuildProps> = ({ id, accountRole }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const context = useAppContext();

  const handleDelete = async () => {
    context?.deleteBuild(id);
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
        <span css={{ width: "31%" }}>
          <Button
            disabled={!isAccountRoleAllowed(accountRole, "DeleteBuild")}
            color="error"
            variant="contained"
            size="large"
            onClick={handleOpen}
            css={{ width: "100%" }}
          >
            <FolderDeleteIcon />
          </Button>
        </span>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("build.delete.title")}</h2>
          {common("build.delete.confirm") +
            "'" +
            context?.getBuilds().find((build) => build.value === id)?.label +
            "'?"}
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
