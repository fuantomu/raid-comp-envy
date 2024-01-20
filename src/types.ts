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
  instance?: string;
  buildId: number;
};

export type BuildResponse = {
  id: string;
  name: string;
  date: number;
  players: string;
  raidId?: number;
  instance?: string;
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

export type AbsenceResponse = {
  id: string;
  playerId: string;
  startDate: number;
  endDate: number;
  reason?: string;
};

export type Absence = {
  id: string;
  player: BuildPlayer;
  startDate: number;
  endDate: number;
  reason?: string;
};

export type Login = {
  createdDate: number;
  role: number;
}

export type UpdateResponse = {
  builds: BuildResponse[];
  players: BuildPlayer[];
  absences: AbsenceResponse[];
};

export type Update = {
  builds: Build[];
  players: BuildPlayer[];
  absences: Absence[];
};
