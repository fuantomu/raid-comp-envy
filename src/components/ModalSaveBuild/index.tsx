/** @jsxImportSource @emotion/react */
import { Button } from "@material-ui/core";
import { FC } from "react";
import ModalAlert, { ModalAlertResponse } from "../ModalAlert";
import { useTranslation } from "react-i18next";
import SaveIcon from "@material-ui/icons/Save";
import { useAppContext } from "../App/context";
import AppError from "../../utils/AppError";
import { AppErrorId } from "../../consts";

export interface ModalSaveBuildProps {}

const ModalSaveBuild: FC<ModalSaveBuildProps> = () => {
  const [common] = useTranslation("common");
  let openModal: any = () => {};
  const context = useAppContext();

  const handleSaveClick = async () => {
    const build = context?.getCurrentBuild();
    if (build) {
      if (build.players.length) {
        return await context?.saveBuild(build);
      } else {
        return openModal();
      }
    }
    throw new AppError(AppErrorId.Unspecific);
  };

  const handleOpen = (callback: () => void) => {
    openModal = callback;
  };

  return (
    <>
      <Button color="default" variant="contained" size="large" onClick={handleSaveClick}>
        <SaveIcon />
      </Button>
      <ModalAlert
        handleOpen={handleOpen}
        title={common("build.save.title")}
        content={common("build.save.emptyBuild")}
      />
    </>
  );
};

export default ModalSaveBuild;
