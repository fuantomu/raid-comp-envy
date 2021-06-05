import Schema from "gstore-node/lib/schema";
import { DatastoreConnector } from "../datastore-connector";
import { DiscordId } from "../types";
import { DiscordUserCharacterType } from "./discord-user-character-model";

const gstore = DatastoreConnector.getInstance();

export type DiscordUserType = {
  discordId: DiscordId;
  characters: DiscordUserCharacterType[];
};

const DiscordUserSchema = new Schema({
  discordId: { type: String, required: true },
  characters: { type: Array },
});

export const DiscordUserModel = gstore.model<DiscordUserType>("DiscordUser", DiscordUserSchema);
