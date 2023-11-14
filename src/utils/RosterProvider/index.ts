import { RaidHelperSignups } from "../../types";

export abstract class RosterProvider {
  private static readonly RAIDHELPER_API_PATH = "https://raid-helper.dev/api/event";

  private static getRosterRaidHelperURI(id?: string) {
    return `${RosterProvider.RAIDHELPER_API_PATH}/${id}`;
  }

  public static async getRosterRaidPlayers(id?: string) : Promise<RaidHelperSignups[]> {
    return fetch(RosterProvider.getRosterRaidHelperURI(id)).then((response) => response.json()).then((signups) => {
      return signups.signups
    })
  }
}
