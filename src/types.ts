import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "./consts";
import { WarcraftRole } from "./utils/RoleProvider/consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;
export type GroupId = 1 | 2 | 3 | 4 | 5 | "roster" | "bench";

export type BuildPlayer = {
  id: string;
  name: string;
  className: WarcraftPlayerClass;
  spec: WarcraftPlayerSpec;
  race: WarcraftPlayerRace;
  raid: number;
  status: InviteStatus;
  group?: GroupId;
  oldName?: string;
  main?: string;
};

export type BuildPlayerResponse = {
  players: BuildPlayer[]
}

export type Build = {
  id: string;
  name: string;
  date: number;
  players: BuildPlayer[];
  raidId?: number;
};

export type BuildResponse = {
  id: string;
  name: string;
  date: number;
  players: string;
  raidId?: number;
};

export type BuildGroup = {
  groupId: GroupId;
  players: BuildPlayer[];
};

export type BuildGroups = {
  [groupId in GroupId]?: BuildGroup;
};

export type BuildRoles = {
  [role in WarcraftRole]: BuildPlayer[];
};

export type SelectOption = {
  value: string;
  label: string;
};

export type Absence = {
  player: BuildPlayer;
  startDate: number;
  endDate: number;
  reason?: string;
};
