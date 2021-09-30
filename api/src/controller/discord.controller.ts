import { GET, Path, QueryParam, Return } from "typescript-rest";
import { DiscordDelegate } from "../delegate/discord.delegate";
import { RoleCheckService } from "../service/raid-check.service";

@Path("/discord")
export class DiscordController {
  @GET
  @Path("/role-check")
  public async getRaiderCheck(
    @QueryParam("requiredRole") requiredRole: string,
    @QueryParam("guildId") guildId: string,
    @QueryParam("channelId") channelId: string
  ) {
    if (!requiredRole || !guildId || !channelId) {
      return Return.NoResponse;
    }
    const roleCheck = await RoleCheckService.getRoleCheck(guildId, requiredRole);

    await DiscordDelegate.postChannelMessage(
      channelId,
      [
        `<@&${requiredRole}> report:\n`,
        "**Add** the role to these users:",
        roleCheck.add.map(({ user: { id } }) => `<@${id}>`),
        "\n**Remove** the role from these users:",
        roleCheck.remove.map(({ user: { id } }) => `<@${id}>`),
      ].join("\n")
    );

    return Return.NoResponse;
  }
}
