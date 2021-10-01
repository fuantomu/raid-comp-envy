import { uniq } from "underscore";
import { DiscordDelegate } from "../delegate/discord.delegate";
import { WowAuditDelegate } from "../delegate/wowaudit.delegate";

export class RoleCheckService {
  public static async getRoleCheck(guildId: string, requiredRole: string) {
    const discordIds = uniq(
      (await WowAuditDelegate.getTeams())
        .map((team) => team.players)
        .flat()
        .map((ch) => ch.discordId)
    );
    const discordUsers = await DiscordDelegate.getGuildMembers(guildId);
    return {
      add: discordUsers
        .filter(({ roles }) => !roles.includes(requiredRole))
        .filter(({ user: { id } }) => discordIds.includes(id)),
      remove: discordUsers
        .filter(({ roles }) => roles.includes(requiredRole))
        .filter(({ user: { id } }) => !discordIds.includes(id))
    };
  }
}
