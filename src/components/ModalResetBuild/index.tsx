/** @jsxImportSource @emotion/react */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import ModalAlert, { ModalAlertResponse } from "../ModalAlert";

export interface ModalResetBuildProps {
  buildId: number
}

const ModalResetBuild: FC<ModalResetBuildProps> = ({buildId}) => {
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
        <Button color="primary" size="large" variant="contained" onClick={handleButtonClick}>
          <DeleteForeverIcon />
        </Button>
      </Tooltip>
    </>
  );
};

export default ModalResetBuild;
