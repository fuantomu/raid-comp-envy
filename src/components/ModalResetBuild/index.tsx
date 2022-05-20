/** @jsxImportSource @emotion/react */
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import ModalAlert, { ModalAlertResponse } from "../ModalAlert";

export interface ModalResetBuildProps {}

const ModalResetBuild: FC<ModalResetBuildProps> = () => {
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
      await context?.resetBuild();
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
      <Button color="primary" size="large" variant="contained" onClick={handleButtonClick}>
        <DeleteForeverIcon />
      </Button>
    </>
  );
};

export default ModalResetBuild;
