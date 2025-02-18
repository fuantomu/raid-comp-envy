/** @jsxImportSource @emotion/react */
import { Box, Checkbox, Input, TextField, Tooltip, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ChangeEvent, FC, createRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import useStyles from "./useStyles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { BuildHelper } from "../../utils/BuildHelper";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import { DiscordMessage } from "../../types";
import useErrorHandler from "../../utils/useErrorHandler";
import { RosterProvider } from "../../utils/RosterProvider";

export interface ModalPostDiscordProps {
  build_id: string;
}

const ModalPostDiscord: FC<ModalPostDiscordProps> = ({ build_id }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [discordMessages, setDiscordMessages] = useState<DiscordMessage[]>([]);
  const handleError = useErrorHandler();
  const [common] = useTranslation("common");
  const [note, setNote] = useState("");
  const context = useAppContext();
  let sheetUrl = createRef<HTMLInputElement>();

  const handleCreate = async () => {
    if (sheetUrl.current?.value && sheetUrl.current?.value !== "") {
      handlePostDiscord(sheetUrl.current?.value);
    } else {
      handlePostDiscord(process.env.REACT_APP_DEFAULT_DISCORD);
    }
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

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    BuildHelper.parseGetDiscordMessages()
    .then((messages) => {
      setDiscordMessages([...messages]);
        messages.find((message) => {
          if(message.buildId === build_id){
            setNote(message.note);
            return true;
          }
          return false;
        })
    })
        .catch(handleError);
      // eslint-disable-next-line
  }, [handleError]);



  const handlePostDiscord = async (sheetUrl: string) => {
    const build = context?.getRaid(build_id);
    if (build) {
      await BuildHelper.parsePostSetup(
        build,
        sheetUrl,
        checked ? context?.getUnsetMains(build_id) : [],
        note,
        context?.getVersion()
      ).then((response) => {

        if(response.length > 0){
          const foundMessage = discordMessages.find((message) => message.buildId === response[0].buildId);
          if(foundMessage){
            discordMessages.map((discordMessage) => {
              if(discordMessage.buildId === foundMessage.buildId){
                discordMessage.note = note
                return true;
              }
              return false;
            })
            setDiscordMessages(discordMessages);
            RosterProvider.saveDiscordMessage(response[0].messageId, response[0].buildId, note);
          }
          else{
            setDiscordMessages((oldMessages) => [...oldMessages,{"buildId": response[0].buildId, "messageId": response[0].messageId, "note": note}]);
            RosterProvider.saveDiscordMessage(response[0].messageId, response[0].buildId, note);
          }
        }

      });
    }
    setOpen(false);
  };

  return (
    <>
      <Box display={"grid"} justifyContent={"center"}>
        <Tooltip title={common("discord.send")} placement="top" arrow>
          <span>
            <Button
              disabled={!isAccountRoleAllowed(context.getAccountRole(), "PostDiscord")}
              color="info"
              variant="contained"
              size="large"
              style={{ width: "140px" }}
              onClick={() => handleOpen()}
              css={{ width: "100%" }}
            >
              <SportsEsportsIcon />
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box css={styles.modal}>
          {discordMessages.find((message) => message.buildId === build_id) ? (
              <h2>{common("discord.update_setup")}</h2>
              ) : (
              <h2>{common("discord.send")}</h2>
          )}

          <Box css={styles.content}>
            <Box css={styles.nameInputWrapper}>
              <Input
                css={styles.nameInput}
                type="text"
                placeholder={common("discord.url")}
                inputRef={sheetUrl}
              />
            </Box>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"}>
              <Typography
                style={{ caretColor: "transparent" }}
                fontSize={"16px"}
                variant="subtitle1"
              >
                {common("discord.bench")}
              </Typography>
              <Checkbox name="checked" checked={checked} onChange={handleChange} />
            </Box>
            <TextField placeholder={common("discord.note")} value={note} onChange={handleNoteChange} multiline={true}/>
          </Box>
          <Box css={styles.buttons}>
            <Button color="success" variant="contained" onClick={handleCreate}>
              {discordMessages.find((message) => message.buildId === build_id) ? (
                common("discord.update")
              ) : (
                common("discord.post")
              )}
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
