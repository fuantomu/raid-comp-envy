import DiscordUserModel, { DiscordUser, DiscordUserDocument } from "../model/discord-user-model";
import { DiscordId } from "../types";

export abstract class DiscordUserDelegate {
  public static async findByDiscordId(discordId: DiscordId): Promise<DiscordUserDocument> {
    return await DiscordUserModel.findOne({ discordId });
  }

  public static async createUpdateUser(user: DiscordUser) {
    const existing = await DiscordUserDelegate.findByDiscordId(user.discordId);
    if (existing) {
      await DiscordUserModel.updateOne({_id: existing._id}, user);
    } else {
      await DiscordUserModel.create(user);
    }
  }
}
