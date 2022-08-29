/** @jsxImportSource @emotion/react */
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AppErrorId } from "../../consts";
import AppError from "../../utils/AppError";
import { useAppContext } from "../App/context";
import ModalAlert from "../ModalAlert";

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
      <Tooltip title={common("cta.saveBuild")} placement="top" arrow>
        <Button color="success" variant="contained" size="large" onClick={handleSaveClick}>
          <SaveIcon />
        </Button>
      </Tooltip>
      <ModalAlert
        handleOpen={handleOpen}
        title={common("build.save.title")}
        content={common("build.save.emptyBuild")}
      />
    </>
  );
};

export default ModalSaveBuild;
