/** @jsxImportSource @emotion/react */
import { Autocomplete, Checkbox, FormControl, TextField, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerSpec
} from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftPlayerClassSpecs } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { isAccountRoleAllowed } from "../../utils/AccountRole";

export interface ModalAddProps {
  editPlayer?: (callback: (player: BuildPlayer, fromRoster: boolean) => void) => void;
  accountRole: number;
  fromRoster?: boolean;
}

const ModalAdd: FC<ModalAddProps> = ({ editPlayer, accountRole, fromRoster = false }) => {
  const styles = useStyles();
  const [common] = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [class_name, setClassName] = useState(WarcraftPlayerClass.Warrior);
  const [spec, setSpec] = useState(WarcraftPlayerSpec.WarriorFury);
  const [raceName, setRace] = useState(WarcraftPlayerRace.Human);
  const [status, setStatus] = useState(InviteStatus.Unknown);
  const [group_id, setGroupId] = useState(1 as GroupId);
  const [main, setMain] = useState("DEFAULT");
  const [name, setName] = useState("");
  const [raid, setRaid] = useState(Number);
  const [id, setId] = useState(String);
  const [alt, setAlt] = useState("DEFAULT");
  const [checked, setChecked] = useState(false);
  const [altOptions, setAltOptions] = useState<any[]>([]);
  const [mainOptions, setMainOptions] = useState<any[]>([]);
  const [roster, setRoster] = useState(fromRoster);
  const context = useAppContext();
  let playerName = name;

  if (editPlayer) {
    editPlayer((player, isRoster) => {
      setRoster(isRoster);
      if (player) {
        setId(player.id);
        setName(player.name);
        setClassName(player.class_name);
        setStatus(player.status);
        setGroupId(player.group_id as GroupId);
        setRaid(player.raid);
        if (player.main) {
          setMain(player.main);
        }
        if (player.spec) {
          setSpec(player.spec);
        }
        if (player.race) {
          setRace(player.race);
        }
        if (player.alt) {
          setAlt(player.alt === "None" ? "DEFAULT" : player.alt);
        }
        if (player.name === player.main) {
          setAltOptions(
            [...context?.getAlts(player).map((alt) => alt.name)].sort((a, b) => a.localeCompare(b))
          );
        }
        setMainOptions(
          [
            ...context?.getMains().map((main) => main.name),
            context
              ?.getMains()
              .map((main) => main.name)
              .includes(player.name)
              ? ""
              : player.name
          ].sort((a, b) => a.localeCompare(b))
        );
        setOpen(true);
      }
    });
  }

  const handleSelectClass = (event: MouseEvent, newClass: string) => {
    if (newClass !== null) {
      setClassName(newClass as WarcraftPlayerClass);
      setSpec(WarcraftPlayerClassSpecs[newClass as WarcraftPlayerClass][0]);
    }
  };

  const handleSelectSpec = (event: MouseEvent, newSpec: string) => {
    if (newSpec !== null) {
      setSpec(newSpec as WarcraftPlayerSpec);
    }
  };

  const handleSelectRace = (event: MouseEvent, newRace: string) => {
    if (newRace !== null) {
      setRace(newRace as WarcraftPlayerRace);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    playerName = event.currentTarget.value;
    setName(playerName);
    setMainOptions(
      [
        ...context?.getMains().map((main) => main.name),
        context
          ?.getMains()
          .map((main) => main.name)
          .includes(playerName)
          ? ""
          : playerName
      ].sort((a, b) => a.localeCompare(b))
    );
  };

  const sendImportToContext = (nameOverride = name, remove = false) => {
    const playerInfo = {
      id: id.length ? id : UUID(),
      name: nameOverride ?? playerName,
      class_name,
      spec,
      raid,
      race: raceName,
      status,
      group_id: group_id as GroupId,
      main: main === "DEFAULT" ? playerName : main,
      alt: alt === "DEFAULT" ? "None" : alt
    };
    if (roster || checked) {
      context?.updateRoster({ ...playerInfo, group_id: "roster" as GroupId }, true, remove);
    }

    if (remove) {
      if (checked) {
        context?.removePlayerFromRaids(playerInfo, true, false);
      } else {
        context?.removePlayerFromRaid(playerInfo, true);
      }
    } else {
      if (!roster) {
        context?.importPlayer(playerInfo);
      }
    }
    setAlt("DEFAULT");
    setMain("DEFAULT");
    setName("");
    setChecked(false);
    setOpen(false);
  };

  const handleAddPlayer = () => {
    if (name.trim() !== "") {
      sendImportToContext();
    }
  };

  const handleViewPlayer = () => {
    window.open(`${process.env.REACT_APP_DASHBOARD}/user.php?user=${playerName}`, "_blank");
  };

  const handleRemovePlayer = () => {
    sendImportToContext(name, true);
  };

  const handleClose = () => {
    setChecked(false);
    setAlt("DEFAULT");
    setMain("DEFAULT");
    setName("");
    setOpen(false);
  };

  const handleOpen = () => {
    setChecked(false);
    setAlt("DEFAULT");
    setMain("DEFAULT");
    setOpen(true);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSelectAlt = (event: any, newValue: string) => {
    if (!newValue) {
      return;
    }
    setAlt(newValue);
  };

  const handleSelectMain = (event: any, newValue: string) => {
    if (!newValue) {
      return;
    }
    setMain(newValue);
  };

  const renderClassToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={class_name}
          exclusive
          onChange={handleSelectClass}
        >
          {Object.keys(WarcraftPlayerClass).map((class_name) => (
            <ToggleButton value={class_name} key={UUID()} title={common(`classes.${class_name}`)}>
              <WarcraftIcon src={IconProvider.getClassIcon(class_name as WarcraftPlayerClass)} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderSpecToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={spec}
          exclusive
          onChange={handleSelectSpec}
        >
          {WarcraftPlayerClassSpecs[class_name].map((spec) => (
            <ToggleButton value={spec} key={UUID()} title={common(`specs.${spec}`)}>
              <WarcraftIcon src={IconProvider.getSpecIcon(spec)} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderRaceToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={raceName}
          exclusive
          onChange={handleSelectRace}
        >
          {Object.keys(WarcraftPlayerRace).map((race) => (
            <ToggleButton value={race} key={UUID()} title={common(`races.${race}`)}>
              <WarcraftIcon src={IconProvider.getRaceIcon(race as WarcraftPlayerRace)} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderMain = () => {
    return (
      <FormControl css={{ justifyContent: "center", width: "500px", marginTop: "20px" }}>
        <Autocomplete
          value={main === "DEFAULT" ? "" : main}
          options={mainOptions}
          sx={{
            backgroundColor: "#1d1d1d",
            border: "1px solid black",
            borderRadius: "5px",
            color: "white"
          }}
          onChange={handleSelectMain}
          renderInput={(params) => (
            <TextField {...params} label={common("build.add.main")} variant="outlined" />
          )}
        />
      </FormControl>
    );
  };

  const renderAlt = () => {
    return (
      <FormControl css={{ justifyContent: "center", width: "500px", marginTop: "20px" }}>
        <Autocomplete
          value={alt === "DEFAULT" ? "" : alt}
          options={altOptions}
          onChange={handleSelectAlt}
          renderInput={(params) => (
            <TextField {...params} label={common("build.add.alt")} variant="outlined" />
          )}
          sx={{
            backgroundColor: "#1d1d1d",
            border: "1px solid black",
            borderRadius: "5px",
            color: "white"
          }}
        />
      </FormControl>
    );
  };

  return (
    <>
      {!editPlayer || fromRoster ? (
        <Tooltip title={common("cta.addPlayer")} placement="top" arrow>
          <span>
            <Button
              disabled={!isAccountRoleAllowed(accountRole, "AddPlayer")}
              color="success"
              variant="contained"
              size="large"
              onClick={handleOpen}
              sx={{ height: "100%", width: "80px" }}
            >
              <PersonAddIcon />
            </Button>
          </span>
        </Tooltip>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box css={styles.modal}>
          <h2>{name ? common("build.edit.title") : common("build.add.title")}</h2>
          <Box css={styles.content}>
            <Box css={styles.nameInputWrapper}>
              <Input
                id={UUID()}
                css={styles.nameInput}
                type="text"
                autoFocus={true}
                defaultValue={name}
                onChange={handleNameChange}
                placeholder="Character name"
              />
            </Box>
            {renderClassToggle()}
            {renderSpecToggle()}
            {renderRaceToggle()}
            {renderMain()}
            {main === name ? renderAlt() : <></>}
          </Box>
          <Box css={styles.buttons}>
            {!roster ? (
              <Box>
                <Checkbox name="checked" checked={checked} onChange={handleChange} />
                {common("build.roster.save")}
              </Box>
            ) : (
              <></>
            )}

            {name ? (
              <Button color="info" variant="contained" onClick={handleViewPlayer}>
                {common("build.add.view")}
              </Button>
            ) : null}
            <Button color="success" variant="contained" onClick={handleAddPlayer}>
              {name ? common("build.edit.save") : common("build.add.add")}
            </Button>
            {name ? (
              <Button color="primary" variant="contained" onClick={handleRemovePlayer}>
                {common("build.edit.remove")}
              </Button>
            ) : null}
            <Button color="secondary" variant="contained" onClick={handleClose}>
              {common("buttons.cancel")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAdd;
