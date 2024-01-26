/** @jsxImportSource @emotion/react */
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ChangeEvent, FC, MouseEvent, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerSpec
} from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { WarcraftPlayerClassSpecs } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { isAccountRoleAllowed } from "../../utils/AccountRole";

export interface ModalAddProps {
  editPlayer?: (callback: (player: BuildPlayer) => void) => void;
  accountRole: number;
}

const ModalAdd: FC<ModalAddProps> = ({ editPlayer, accountRole }) => {
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
  const [oldName, setOldName] = useState<string>();
  const [checked, setChecked] = useState(false);
  const [altOptions, setAltOptions] = useState<any[]>([]);
  const context = useAppContext();
  let playerName = name;

  if (editPlayer) {
    editPlayer((player) => {
      if (player) {
        const fullName = PlayerUtils.getFullName(player);
        setId(player.id);
        setName(fullName);
        setOldName(fullName);
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
  };

  const handleNameBlur = () => {
    setName(playerName);
  };

  const sendImportToContext = (nameOverride = name, remove = false) => {
    const { name: playerName } = PlayerUtils.splitFullName(nameOverride);
    const playerInfo = {
      id: id.length ? id : UUID(),
      name: playerName ?? oldName,
      class_name,
      spec,
      raid,
      race: raceName,
      status,
      group_id: group_id as GroupId,
      oldName,
      main: main === "DEFAULT" ? playerName : main,
      alt: alt === "DEFAULT" ? "" : alt
    };

    if (remove) {
      if (checked) {
        context?.removePlayerFromRaids(playerInfo, true, false);
        context?.removeFromRoster({ ...playerInfo, group_id: "roster" as GroupId }, true);
      } else {
        context?.removePlayerFromRaid(playerInfo, true);
      }
    } else {
      if (checked) {
        context?.updateRoster({ ...playerInfo, group_id: "roster" as GroupId }, true);
      } else {
        context?.importPlayer(playerInfo);
      }
    }
    setAlt("DEFAULT");
    setMain("DEFAULT");
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

  const handleSelectAlt = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setAlt(event.target.value);
  };

  const handleSelectMain = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setMain(event.target.value);
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
        <InputLabel>{common("build.add.main")}</InputLabel>
        <Select
          variant="outlined"
          fullWidth
          value={main}
          label={common("build.add.main")}
          onChange={handleSelectMain}
          MenuProps={{ PaperProps: { sx: { maxHeight: 500, width: 300 } } }}
        >
          <MenuItem disabled key={"DEFAULT"} value={"DEFAULT"}>
            Select a character...
          </MenuItem>
          {[
            ...context?.getMains().map((main) => main.name),
            context
              ?.getMains()
              .map((main) => main.name)
              .includes(playerName)
              ? undefined
              : playerName
          ]
            .sort((a, b) => a.localeCompare(b))
            .map((option) => (
              <MenuItem key={UUID()} value={option}>
                {" "}
                {option}{" "}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  };

  const renderAlt = () => {
    return (
      <FormControl css={{ justifyContent: "center", width: "500px", marginTop: "20px" }}>
        <InputLabel>{common("build.add.alt")}</InputLabel>
        <Select
          variant="outlined"
          fullWidth
          value={alt}
          label={common("build.add.alt")}
          onChange={handleSelectAlt}
          MenuProps={{ PaperProps: { sx: { maxHeight: 500, width: 300 } } }}
        >
          <MenuItem disabled key={"DEFAULT"} value={"DEFAULT"}>
            Select a character...
          </MenuItem>
          {altOptions.map((option) => (
            <MenuItem key={UUID()} value={option}>
              {" "}
              {option}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      {!editPlayer ? (
        <Tooltip title={common("cta.addPlayer")} placement="top" arrow>
          <span>
            <Button
              disabled={!isAccountRoleAllowed(accountRole, "AddPlayer")}
              color="success"
              variant="contained"
              size="large"
              css={{ height: "80%" }}
              onClick={handleOpen}
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
          <h2>{oldName ? common("build.edit.title") : common("build.add.title")}</h2>
          <Box css={styles.content}>
            <Box css={styles.nameInputWrapper}>
              <Input
                id={UUID()}
                css={styles.nameInput}
                type="text"
                autoFocus={true}
                defaultValue={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
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
            <Box>
              <Checkbox name="checked" checked={checked} onChange={handleChange} />
              {common("build.roster.save")}
            </Box>
            {oldName ? (
              <Button color="info" variant="contained" onClick={handleViewPlayer}>
                {common("build.add.view")}
              </Button>
            ) : null}
            <Button color="success" variant="contained" onClick={handleAddPlayer}>
              {oldName ? common("build.edit.save") : common("build.add.add")}
            </Button>
            {oldName ? (
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
