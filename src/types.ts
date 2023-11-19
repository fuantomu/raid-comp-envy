import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "./consts";
import { WarcraftRole } from "./utils/RoleProvider/consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;
export type GroupId = "none" | 1 | 2 | 3 | 4 | 5 | "roster";

export type BuildPlayer = {
  name: string;
  realm?: string;
  class: WarcraftPlayerClass;
  spec?: WarcraftPlayerSpec;
  status: InviteStatus;
  group?: GroupId;
  oldName?: string;
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
  buildId: BuildId;
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
