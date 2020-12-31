import { GroupId } from "./consts";

export type BuildId = string;

export interface BuildPlayer {
  name: string;
  realm?: string;
  class: string;
  spec?: string;
  status: string;
  group?: GroupId;
}

export interface BuildType {
  buildId: BuildId;
  name: string;
  players: Array<BuildPlayer>;
}

export interface BuildResponse {
  buildId: string;
  buildName: string;
  team?: string;
}
