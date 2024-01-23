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
  class_name: WarcraftPlayerClass;
  spec: WarcraftPlayerSpec;
  race: WarcraftPlayerRace;
  raid: number;
  status: InviteStatus;
  group_id?: GroupId;
  oldName?: string;
  main?: string;
  alt?: string;
};

export type BuildPlayerResponse = {
  players: BuildPlayer[]
}

export type Build = {
  id: string;
  name: string;
  date: number;
  players: BuildPlayer[];
  raid_id?: number;
  instance?: string;
  build_id: number;
};

export type BuildResponse = {
  id: string;
  name: string;
  date: number;
  players: string;
  raid_id?: string;
  instance?: string;
};

export type BuildGroup = {
  group_id: GroupId;
  players: BuildPlayer[];
};

export type BuildGroups = {
  [group_id in GroupId]?: BuildGroup;
};

export type BuildRoles = {
  [role in WarcraftRole]: BuildPlayer[];
};

export type SelectOption = {
  value: string;
  label: string;
  date?: number;
};

export type AbsenceResponse = {
  id: string;
  player_id: string;
  start_date: number;
  end_date: number;
  reason?: string;
};

export type Absence = {
  id: string;
  player: BuildPlayer;
  start_date: number;
  end_date: number;
  reason?: string;
};

export type Login = {
  created_date: number;
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
