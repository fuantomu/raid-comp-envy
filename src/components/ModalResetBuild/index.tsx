/** @jsxImportSource @emotion/react */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import ModalAlert, { ModalAlertResponse } from "../ModalAlert";
import { isAccountRoleAllowed } from "../../utils/AccountRole";

export interface ModalResetBuildProps {
  buildId: number,
  accountRole: number
}

const ModalResetBuild: FC<ModalResetBuildProps> = ({buildId, accountRole}) => {
  const [common] = useTranslation("common");
  let handleModalOpen: any = () => {};
  const context = useAppContext();

  const handleButtonClick = () => {
    handleModalOpen();
  };

  const handleOpen = (callback: any) => {
    handleModalOpen = callback;
  };

  const handleConfirm = async (response: ModalAlertResponse) => {
    if (response === ModalAlertResponse.OK) {
      await context?.resetBuild(buildId);
    }
  };

  return (
    <>
      <ModalAlert
        handleOpen={handleOpen}
        title={common("build.reset.title")}
        content={common("build.reset.confirm")}
        handleConfirm={handleConfirm}
        cancelButton
      />
      <Tooltip title={common("cta.resetBuild")} placement="top" arrow>
        <span>
          <Button disabled={!isAccountRoleAllowed(accountRole, "ResetBuild")} color="primary" size="large" variant="contained" onClick={handleButtonClick} css={{width:"100%"}}>
            <DeleteForeverIcon />
          </Button>
        </span>
      </Tooltip>
    </>
  );
};

export default ModalResetBuild;
