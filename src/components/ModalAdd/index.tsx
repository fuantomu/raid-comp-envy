/** @jsxImportSource @emotion/react */
import AddIcon from "@mui/icons-material/Add";
import { Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import { BuildPlayer, GroupId } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import { PlayerUtils } from "../../utils/PlayerUtils";
import { WarcraftPlayerClassSpecs } from "../../utils/RoleProvider/consts";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";
import AttendanceIcon from "../AttendanceIcon";
import WarcraftIcon from "../Icon";
import useStyles from "./useStyles";

export interface ModalAddProps {
  editPlayer?: (callback: (player: BuildPlayer) => void) => void;
}

const ModalAdd: FC<ModalAddProps> = ({ editPlayer }) => {
  const styles = useStyles();
  const [common] = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState(WarcraftPlayerClass.Warrior);
  const [spec, setSpec] = useState(WarcraftPlayerSpec.WarriorArms);
  const [status, setStatus] = useState(InviteStatus.Invited);
  const [groupId, setGroupId] = useState(1 as GroupId);
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState<string>();
  const [checked, setChecked] = useState(false);
  const context = useAppContext();
  let playerName = name;

  if (editPlayer) {
    editPlayer((player) => {
      if (player) {
        const fullName = PlayerUtils.getFullName(player);
        setName(fullName);
        setOldName(fullName);
        setClassName(player.class);
        setStatus(player.status);
        setGroupId(player.group as GroupId);
        if (player.spec) {
          setSpec(player.spec);
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

  const handleSelectGroup = (event: MouseEvent, newGroupId: string) => {
    if (newGroupId !== null) {
      setGroupId(newGroupId as GroupId);
    }
  };

  const handleSelectStatus = (event: MouseEvent, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus as InviteStatus);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    playerName = event.currentTarget.value;
  };

  const handleNameBlur = () => {
    setName(playerName);
  };

  const sendImportToContext = (nameOverride = name, remove = false) => {
    const { name: playerName, realm } = PlayerUtils.splitFullName(nameOverride);
    context?.importBuild([
      {
        name: playerName,
        class: className,
        spec,
        status,
        group: groupId as GroupId,
        realm,
        oldName,
      },
    ]);
    if(checked){
      const playerB = {
        name: name?? oldName,
        class: className,
        spec,
        status,
        group: groupId as GroupId,
        realm,
        oldName,
      }
      if(remove){
        context?.removeFromRoster(playerB);
      }
      else{
        context?.addToRoster(playerB);
      }
    }
    setOpen(false);
    setChecked(false);
  };

  const handleAddPlayer = () => {
    if (name.trim() !== "") {
      sendImportToContext();
    }
  };

  const handleRemovePlayer = () => {
    sendImportToContext("",true);
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

  const renderClassToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={className}
          exclusive
          onChange={handleSelectClass}
        >
          {Object.keys(WarcraftPlayerClass).map((className) => (
            <ToggleButton value={className} key={UUID()} title={common(`classes.${className}`)}>
              <WarcraftIcon src={IconProvider.getClassIcon(className as WarcraftPlayerClass)} />
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
          {WarcraftPlayerClassSpecs[className].map((spec) => (
            <ToggleButton value={spec} key={UUID()} title={common(`specs.${spec}`)}>
              <WarcraftIcon src={IconProvider.getSpecIcon(spec)} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderStatusToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={status}
          exclusive
          onChange={handleSelectStatus}
        >
          {Object.values(InviteStatus).map((status) => (
            <ToggleButton value={status} key={UUID()} title={common(`status.${status}`)}>
              <AttendanceIcon status={status} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderGroupsToggle = () => {
    const groups = ["none", 1, 2, 3, 4, 5];
    return (
      <Box>
        <ToggleButtonGroup
          css={styles.buttonGroups}
          value={groupId}
          exclusive
          onChange={handleSelectGroup}
        >
          {groups.map((groupId) => (
            <ToggleButton value={groupId} key={UUID()}>
              <Typography css={styles.groupSelectElement}>
                {common("build.add.groups.group_each", { groupId })}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  return (
    <>
      {!editPlayer ? (
        <Tooltip title={common("cta.addPlayer")} placement="top" arrow>
          <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
            <AddIcon />
          </Button>
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
                css={styles.nameInput}
                type="text"
                autoFocus={true}
                defaultValue={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
            </Box>
            {renderClassToggle()}
            {renderSpecToggle()}
            {renderStatusToggle()}
            {renderGroupsToggle()}
          </Box>
          <Box css={styles.buttons}>
             <FormControlLabel
               control = {<Checkbox
                name="checked"
                checked={checked}
                onChange={handleChange}
              />}
              label="Save to Roster"
            />
            {checked? (<Button color="success" variant="contained" onClick={handleAddPlayer}>
              {oldName ? common("build.edit.save") : common("build.add.addRoster")}
            </Button>) :(<Button color="success" variant="contained" onClick={handleAddPlayer}>
              {oldName ? common("build.edit.save") : common("build.add.add")}
            </Button>)}
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
