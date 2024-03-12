import {
  InviteStatus,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerSpec
} from "./consts";
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
  raid: string;
  status: InviteStatus;
  group_id?: GroupId;
  main?: string;
  alt?: string;
};

export type BuildPlayerResponse = {
  players: BuildPlayer[];
};

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
  uid: string;
};

export type Absence = {
  id: string;
  player: BuildPlayer;
  start_date: number;
  end_date: number;
  reason?: string;
  uid: string;
};

export type Login = {
  created_date: number;
  role: number;
  username: string;
};

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

export type WebSocketMessage = {
  socketId: string;
  message_type: string;
  data: PlayerData | BuildData | AbsenceData | string;
  date: number;
  id?: string;
  account_name: string;
  version?: string;
};

export type PlayerData = {
  player: BuildPlayer;
  build_id?: string;
  oldData?: BuildPlayer;
};

export type BuildData = {
  build: Build;
  oldData?: Build;
};

export type AbsenceData = {
  start_date: number;
  end_date: number;
  player_id: string;
  reason: string;
};

export type Message = {
  type: string;
  from: string;
  date: number;
  changes: Difference[];
  buildId?: string;
  version?: string;
};

export type Difference = {
  key: string;
  objectType: string;
  objectName?: string;
  propertyType: string;
  propertyName: string;
  old?: any;
  new: any;
};

export type MessageData = {
  socketId: string;
  message_type: string;
  data: any;
  account_name: string;
  date: number;
  version: string;
};

export type LoggedInUser = {
  host: string;
  username: string;
};
