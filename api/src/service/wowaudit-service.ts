import fetch from "node-fetch";
import { parse } from "node-html-parser";
import { WowauditData } from "../types";

export abstract class WowauditService {
  public static async getGuildInfo(): Promise<WowauditData> {
    const html = await fetch(
      "https://wowaudit.com/eu/stormscale/the-silverhelms/blind-ferrets/roster",
      {
        headers: {
          cookie: process.env.WOWAUDIT_COOKIE,
        },
      }
    ).then((res) => res.text());

    const root = parse(html);
    const guildData = JSON.parse(root.querySelector("html body slot").attributes.data);
    return guildData;
  }
}
