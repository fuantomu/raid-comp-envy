import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "./consts";
import { WarcraftRole } from "./utils/RoleProvider/consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;
export type GroupId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BuildPlayer = {
  name: string;
  realm?: string;
  class: WarcraftPlayerClass;
  spec?: WarcraftPlayerSpec;
  status: InviteStatus;
  group?: GroupId;
};

export type Build = {
  buildId: BuildId;
  players: BuildPlayer[];
  grouped: boolean;
};

export type BuildGroup = {
  groupId: GroupId;
  players: BuildPlayer[];
};

export type BuildRoles = {
  [role in WarcraftRole]: BuildPlayer[];
};
