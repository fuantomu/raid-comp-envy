import { DiscordUserModel, DiscordUserType } from "../model/discord-user-model";
import { DiscordId, EntityType } from "../types";

export abstract class DiscordUserDelegate {
  private static async findEntityByDiscordId(
    discordId: DiscordId
  ): Promise<EntityType<DiscordUserType>> {
    return await DiscordUserModel.findOne({ discordId });
  }

  public static async findByDiscordId(discordId: DiscordId): Promise<DiscordUserType | undefined> {
    return (await DiscordUserDelegate.findEntityByDiscordId(discordId))?.entityData;
  }

  public static async createUpdateUser(user: DiscordUserType) {
    const existing = await DiscordUserDelegate.findEntityByDiscordId(user.discordId);
    if (existing) {
      existing.entityData = user;
      await existing.save();
    } else {
      await new DiscordUserModel(user).save();
    }
  }
}
