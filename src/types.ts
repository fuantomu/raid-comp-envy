import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerRace, WarcraftPlayerSpec } from "./consts";
import { WarcraftRole } from "./utils/RoleProvider/consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;
export type GroupId = "none" | 1 | 2 | 3 | 4 | 5 | "roster" | "bench";

export type BuildPlayer = {
  id: string;
  name: string;
  realm?: string;
  class: WarcraftPlayerClass;
  spec?: WarcraftPlayerSpec;
  race?: WarcraftPlayerRace;
  raid?: Number;
  status: InviteStatus;
  group?: GroupId;
  oldName?: string;
  main?: string;
};

export type ConnectionString = {
  server?: string;
  port?: string;
  database?: string;
  uid?: string;
  password?: string;
  table?: string;
  players?: Array<BuildPlayer>;
};

export type RaidHelper = {
  signups: Array<RaidHelperSignups>;
};

export type RaidHelperSignups = {
  role: string;
  name: string;
  class: string;
  spec: string
};

export type Build = {
  name: string;
  players: BuildPlayer[];
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
