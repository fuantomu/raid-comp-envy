import { Errors, Path, POST } from "typescript-rest";
import { DiscordPlayersMapper } from "../mappers/discord-player";

@Path("/wowaudit")
export class WowauditController {
  @POST
  @Path("/update")
  public async updateGuild({key}: {key: string}) {
    if (!key || key !== process.env.WOWAUDIT_UPDATE_KEY) {
      throw new Errors.ForbiddenError();
    }
    await DiscordPlayersMapper.updateCharacters();
  }
}
