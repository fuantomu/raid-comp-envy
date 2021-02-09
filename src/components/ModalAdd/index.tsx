/** @jsxImportSource @emotion/react */
import { Avatar, Box, Button, Modal, Typography } from "@material-ui/core";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./useStyles";
import { useTranslation } from "react-i18next";
import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../../consts";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import UUID from "../../utils/UUID";
import { IconProvider } from "../../utils/IconProvider";
import { WarcraftPlayerClassSpecs } from "../../utils/RoleProvider/consts";
import AttendanceIcon from "../AttendanceIcon";
import { useAppContext } from "../App/context";
import { BuildPlayer, GroupId } from "../../types";
import { PlayerUtils } from "../../utils/PlayerUtils";

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
  const [groupId, setGroupId] = useState("none" as GroupId);
  const [name, setName] = useState("");
  const [oldName, setOldName] = useState<string>();
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
      setSpec(WarcraftPlayerClassSpecs[className][0]);
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

  const sendImportToContext = (nameOverride = name) => {
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
    setOpen(false);
  };

  const handleAddPlayer = () => {
    if (name.trim() !== "") {
      sendImportToContext();
    }
  };

  const handleRemovePlayer = () => {
    sendImportToContext("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const renderClassToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup css={styles.buttonGroups} value={className} exclusive onChange={handleSelectClass}>
          {Object.keys(WarcraftPlayerClass).map((className) => (
            <ToggleButton value={className} key={UUID()} title={common(`classes.${className}`)}>
              <Avatar
                css={styles.icon}
                src={IconProvider.getClassIcon(className as WarcraftPlayerClass)}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderSpecToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup css={styles.buttonGroups} value={spec} exclusive onChange={handleSelectSpec}>
          {WarcraftPlayerClassSpecs[className].map((spec) => (
            <ToggleButton value={spec} key={UUID()} title={common(`specs.${spec}`)}>
              <Avatar css={styles.icon} src={IconProvider.getSpecIcon(spec)} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    );
  };

  const renderStatusToggle = () => {
    return (
      <Box>
        <ToggleButtonGroup css={styles.buttonGroups} value={status} exclusive onChange={handleSelectStatus}>
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
    const groups = ["none", 1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <Box>
        <ToggleButtonGroup css={styles.buttonGroups} value={groupId} exclusive onChange={handleSelectGroup}>
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
        <Button color="secondary" variant="contained" size="large" onClick={handleOpen}>
          <AddIcon />
        </Button>
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
            <Box>
              <input
                css={styles.nameInput}
                type="text"
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
            <Button color="primary" variant="contained" onClick={handleAddPlayer}>
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
