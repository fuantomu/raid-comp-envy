import Schema from "gstore-node/lib/schema";
import { WarcraftPlayerClass, WarcraftPlayerSpec } from "../consts";
import { DatastoreConnector } from "../datastore-connector";
import { RaidTeam } from "../mappers/discord-player";

const gstore = DatastoreConnector.getInstance();

export interface DiscordUserCharacterType {
  spec?: WarcraftPlayerSpec;
  className: WarcraftPlayerClass;
  character: string;
  team: RaidTeam;
}

export const DiscordUserCharacterSchema = new Schema({
  spec: { type: String, optional: true },
  className: { type: String },
  character: { type: String },
  team: { type: String },
});

export const DiscordUserCharacterModel = gstore.model(
  "DiscordUserCharacter",
  DiscordUserCharacterSchema
);
