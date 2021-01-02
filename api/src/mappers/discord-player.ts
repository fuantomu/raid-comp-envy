import { WarcraftPlayerSpec } from "../consts";
import { DiscordUserCharacter } from "../model/discord-user-character-model";
import { DiscordUser } from "../model/discord-user-model";
import { DiscordUserDelegate } from "../service/discord-user-delegate";
import { WowauditService } from "../service/wowaudit-service";
import { DiscordId } from "../types";

export enum RaidTeam {
  BF = "Blind Ferrets",
  HC = "Headless Chickens",
}

const WowauditTeams: {
  [id: number]: RaidTeam;
} = {
  7295: RaidTeam.BF,
  32827: RaidTeam.HC
}

export abstract class DiscordPlayersMapper {
  public static async getAccount(discordId: DiscordId) {
    return await DiscordUserDelegate.findByDiscordId(discordId);
  }

  public static async getCharacter(
    discordId: DiscordId,
    spec: WarcraftPlayerSpec
  ): Promise<DiscordUserCharacter> {
    const account = await DiscordUserDelegate.findByDiscordId(discordId);
    return account?.characters.find((ch) => ch.spec === spec);
  }

  public static async updateCharacters() {
    const guildData = (await WowauditService.getGuildInfo()).guild;
    const discordUsers: Record<string, any> = {};
    for (const team of guildData.teams) {
      for (const char of team.characters) {
        const discordId = (char.note ?? "").trim();
        if (discordId.match(/^\d{7,20}$/)) {
          if (!discordUsers[discordId]) {
            discordUsers[discordId] = [];
          }
          discordUsers[discordId].push({
            ...char,
            team: team.id
          });
        }
      }
    }

    for (const discordId of Object.keys(discordUsers)) {
      const discordUser: DiscordUser = {
        discordId,
        characters: []
      }
      for (const character of discordUsers[discordId]) {
        discordUser.characters.push({
          className: character.class,
          character: character.name,
          team: WowauditTeams[character.team]
        })
      }
      try {
        await DiscordUserDelegate.createUpdateUser(discordUser);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
