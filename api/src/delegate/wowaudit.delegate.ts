import fetch from "node-fetch";
import { WowAuditPlayerClass } from "../mapper/wow-audit.mapper";
import { DiscordId } from "../types";

export abstract class WowAuditDelegate {
  public static async getTeams(): Promise<Team[]> {
    return Promise.all(
      this.getApiKeys().map(async (apiKey) => {
        const { name } = await this.fetchTeamData(apiKey);
        const players = (await this.fetchTeamCharacters(apiKey)).map(this.convertCharacter);
        return {
          name,
          players,
          filter: true,
        };
      })
    );
  }

  private static getApiKeys(): string[] {
    return (process.env.WOWAUDIT_API_KEYS ?? "").split(" ");
  }

  private static async fetchTeamData(apiKey: string): Promise<WowAuditTeam> {
    return this.fetchWowAuditApi(apiKey, "/team");
  }

  private static async fetchTeamCharacters(apiKey: string): Promise<WowAuditCharacter[]> {
    return this.fetchWowAuditApi(apiKey, "/characters");
  }

  private static async fetchWowAuditApi(apiKey: string, apiPath: string): Promise<any> {
    const wowAuditBaseUrl = process.env.WOWAUDIT_API_URL;
    return await fetch(wowAuditBaseUrl + apiPath, {
      headers: {
        Authorization: apiKey,
      },
    }).then((res) => res.json());
  }

  private static convertCharacter({
    name,
    realm,
    class: className,
    role,
    note,
  }: WowAuditCharacter): TeamCharacter {
    return {
      character: name,
      realm,
      discordId: note,
      className: className as WowAuditPlayerClass,
      role,
    };
  }
}

interface WowAuditTeam {
  name: string;
}

interface WowAuditCharacter {
  name: string;
  realm: string;
  class: string;
  role: string;
  note: string;
}

export interface TeamCharacter {
  character: string;
  discordId: DiscordId;
  className: WowAuditPlayerClass;
  realm: string;
  role: string;
}

export interface Team {
  name: string;
  players: TeamCharacter[];
  filter: boolean;
}
