export type BuildId = string;
export type GroupId = "none" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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
