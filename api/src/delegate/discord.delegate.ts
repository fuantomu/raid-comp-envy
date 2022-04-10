import fetch from "node-fetch";
import { DiscordGuildMember } from "./model/discord.types";

export abstract class DiscordDelegate {
  private static getBotToken(): string {
    return process.env.DISCORD_BOT_TOKEN;
  }

  private static getDiscordBaseUrl(): string {
    return process.env.DISCORD_API_URL;
  }

  public static async getGuildMembers(
    guildId: string,
    limit: number = 1000
  ): Promise<DiscordGuildMember[]> {
    return DiscordDelegate.fetchDiscordApi(`/guilds/${guildId}/members?limit=${limit}`);
  }

  public static async postChannelMessage(channelId: string, content: string) {
    return await DiscordDelegate.postDiscordApi(`/channels/${channelId}/messages`, {
      content,
    });
  }

  private static async fetchDiscordApi(apiPath: string): Promise<DiscordGuildMember[]> {
    return (await fetch(DiscordDelegate.getDiscordBaseUrl() + apiPath, {
      headers: {
        Authorization: `Bot ${DiscordDelegate.getBotToken()}`,
      },
    }).then((res) => res.json())) as Promise<DiscordGuildMember[]>;
  }

  private static async postDiscordApi(apiPath: string, body: Record<string, any>) {
    return await fetch(DiscordDelegate.getDiscordBaseUrl() + apiPath, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Authorization": `Bot ${DiscordDelegate.getBotToken()}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
}
