import { InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "./consts";

export type AppErrorData = {
  action?: string;
  message: string;
  name: string;
  onRetry: () => void;
};

export type BuildId = string;

export type BuildPlayer = {
  name: string;
  realm?: string;
  class: WarcraftPlayerClass;
  spec?: WarcraftPlayerSpec;
  status: InviteStatus;
  group?: number;
};

export type Build = {
  buildId: BuildId;
  players: BuildPlayer[];
  grouped: boolean;
};