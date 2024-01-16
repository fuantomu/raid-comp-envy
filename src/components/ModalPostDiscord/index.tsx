/** @jsxImportSource @emotion/react */
import { Box, Checkbox, Input, Tooltip, Typography } from "@mui/material";
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button";
import { FC, createRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import useStyles from "./useStyles";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { BuildHelper } from "../../utils/BuildHelper";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import UUID from "../../utils/UUID";


export interface ModalPostDiscordProps {
  buildId: number;
  accountRole: number;
}

const ModalPostDiscord: FC<ModalPostDiscordProps> = ({buildId, accountRole}) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
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
    setChecked(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setChecked(false);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handlePostDiscord = (sheetUrl: string) => {
    const build = context?.getBuild(buildId)
    if(build){
      BuildHelper.parsePostSetup(build, sheetUrl, checked? context?.getUnsetMains() : [])
    }
    setOpen(false);
  };

  return (
    <>
      <Box display={"grid"} justifyContent={"center"}>
        <Tooltip title={common("discord.send")} placement="top" arrow>
          <span>
            <Button disabled={!isAccountRoleAllowed(accountRole, "PostDiscord")} color="info" variant="contained" size="large" style={{height: '30px', width: '130px'}} onClick={() => handleOpen()} css={{width:"100%"}}>
              <SportsEsportsIcon />
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          <h2>{common("discord.send")}</h2>
          <Box css={styles.content}>
            <Box css={styles.nameInputWrapper}>
              <Input css={styles.nameInput}
                  type="text"
                  placeholder={common("discord.url")}
                  inputRef={sheetUrl}/>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
              <Typography style={{caretColor: "transparent"}} fontSize={"16px"} variant="subtitle1">
                {common("discord.bench")}
              </Typography>
              <Checkbox
                    name="checked"
                    checked={checked}
                    onChange={handleChange}
              />
            </Box>
          </Box>

          <Box css={styles.buttons}>
            <Button color="success" variant="contained" onClick={handleCreate}>
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
