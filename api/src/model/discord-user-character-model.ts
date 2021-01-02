import * as mongoose from "mongoose";
import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../consts";
import { RaidTeam } from "../mappers/discord-player";

export interface DiscordUserCharacter {
  spec?: WarcraftPlayerSpec;
  className: WarcraftPlayerClass;
  character: string;
  team: RaidTeam;
}

export type DiscordUserCharacterDocument = DiscordUserCharacter & mongoose.Document;

export const DiscordUserCharacterSchema = new mongoose.Schema({
  spec: { type: String, index: true },
  className: { type: String, required: true, index: true },
  character: { type: String, required: true },
  team: { type: String, required: true },
});
