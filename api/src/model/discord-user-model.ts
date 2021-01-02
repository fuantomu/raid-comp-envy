import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { DiscordId } from "../types";
import { DiscordUserCharacter, DiscordUserCharacterSchema } from "./discord-user-character-model";

export type DiscordUser = {
  discordId: DiscordId;
  characters: DiscordUserCharacter[];
};

export type DiscordUserDocument = DiscordUser & mongoose.Document;

export const DiscordUserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, index: true },
  characters: [DiscordUserCharacterSchema],
});

const DiscordUserModel: Model<DiscordUserDocument> = mongoose.model<DiscordUserDocument>(
  "DiscordUser",
  DiscordUserSchema
);
export default DiscordUserModel;
