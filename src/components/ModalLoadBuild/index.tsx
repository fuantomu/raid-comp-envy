/** @jsxImportSource @emotion/react */
import GetAppIcon from '@mui/icons-material/GetApp';
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AppErrorId } from "../../consts";
import AppError from "../../utils/AppError";
import { useAppContext } from "../App/context";
import ModalAlert, { ModalAlertResponse } from "../ModalAlert";

export interface ModalLoadBuildProps {
  buildId: number
}

const ModalLoadBuild: FC<ModalLoadBuildProps> = ({buildId}) => {
  const [common] = useTranslation("common");
  let openModal: any = () => {};
  const context = useAppContext();

  const handleLoadClick = async () => {
    const build = context?.getCurrentBuild(buildId);
    if (build) {
      if (build.players.length) {
        return openModal();
      } else {
        return await context?.loadBuildSql(build.name,buildId);
      }
    }
    throw new AppError(AppErrorId.Unspecific);
  };

  const handleOpen = (callback: () => void) => {
    openModal = callback;
  };

  const handleConfirm = async (response: ModalAlertResponse) => {
    if (response === ModalAlertResponse.OK) {
      await context?.loadBuildSql(context.getCurrentBuild(buildId).name,buildId);
    }
  };

  return (
    <>
      <Tooltip title={common("cta.loadBuild")} placement="top" arrow>
        <Button color="warning" variant="contained" size="large" onClick={handleLoadClick}>
          <GetAppIcon />
        </Button>
      </Tooltip>
      <ModalAlert
        handleOpen={handleOpen}
        title={common("build.load.title")}
        content={common("build.load.emptyBuild")}
        handleConfirm={handleConfirm}
        cancelButton>
      </ModalAlert>
    </>
  );
};

export default ModalLoadBuild;
