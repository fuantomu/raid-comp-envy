import { Entity } from "gstore-node/lib/entity";
import { CustomEntityFunction } from "gstore-node/lib/types";
import { WarcraftPlayerClass } from "./consts";

export type BuildId = string;
export type DiscordId = string;

export interface BuildResponse {
  buildId: string;
  buildName: string;
  team?: string;
}

export interface WowauditData {
  guild: {
    teams: [
      {
        id: number;
        slug: string;
        characters: [
          {
            name: string;
            class: WarcraftPlayerClass;
            note: string;
          }
        ];
      }
    ];
  };
}

export type EntityType<T extends Object> = Entity<
  T,
  {
    [key: string]: CustomEntityFunction<T>;
  }
>;
