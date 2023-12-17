/** @jsxImportSource @emotion/react */
import { Box, Tooltip } from "@mui/material";
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button";
import { FC, createRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import useStyles from "./useStyles";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { BuildHelper } from "../../utils/BuildHelper";


export interface ModalPostDiscordProps {
  buildId: number
}

const ModalPostDiscord: FC<ModalPostDiscordProps> = ({buildId}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [common] = useTranslation("common");
  const context = useAppContext();
  let sheetUrl = createRef<HTMLInputElement>();

  const handleCreate = async () => {
    const currentUrl = sheetUrl.current?.value?? "";
    console.log("Posting setup to discord with url "+currentUrl);
    handlePostDiscord(currentUrl)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handlePostDiscord = (sheetUrl: string) => {
    const build = context?.getCurrentBuild(buildId)
    if(build){
      BuildHelper.parsePostSetup(build, sheetUrl)
    }
    setOpen(false);
  };

  return (
    <>
      <Box display={"grid"} justifyContent={"center"}>
        <Tooltip title={common("discord.send")} placement="top" arrow>
          <Button color="info" variant="contained" size="large" style={{height: '30px', width: '130px'}} onClick={() => handleOpen()}>
            <SportsEsportsIcon />
          </Button>
        </Tooltip>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("discord.url")}</h2>
          <input ref={sheetUrl}></input>
          <br />
          <Box css={styles.buttons}>
            <Button color="primary" variant="contained" onClick={handleCreate}>
              {common("discord.post")}
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

export default ModalPostDiscord;
