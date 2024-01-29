/** @jsxImportSource @emotion/react */
import { Box, Checkbox, Input, Tooltip, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FC, createRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App/context";
import useStyles from "./useStyles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { BuildHelper } from "../../utils/BuildHelper";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import StyledTextField from "../StyledTextField";

export interface ModalPostDiscordProps {
  build_id: number;
  accountRole: number;
}

const ModalPostDiscord: FC<ModalPostDiscordProps> = ({ build_id, accountRole }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [common] = useTranslation("common");
  const noteRef = useRef<any>();
  const context = useAppContext();
  let sheetUrl = createRef<HTMLInputElement>();

  const handleCreate = async () => {
    const currentUrl = sheetUrl.current?.value ?? "";
    handlePostDiscord(currentUrl);
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
    const build = context?.getRaid(build_id);
    if (build) {
      BuildHelper.parsePostSetup(
        build,
        sheetUrl,
        checked ? context?.getUnsetMains(build_id) : [],
        noteRef.current?.value,
        context?.getVersion()
      );
    }
    setOpen(false);
  };

  return (
    <>
      <Box display={"grid"} justifyContent={"center"}>
        <Tooltip title={common("discord.send")} placement="top" arrow>
          <span>
            <Button
              disabled={!isAccountRoleAllowed(accountRole, "PostDiscord")}
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
          <h2>{common("discord.send")}</h2>
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
            <StyledTextField placeholder={common("discord.note")} textRef={noteRef} />
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
