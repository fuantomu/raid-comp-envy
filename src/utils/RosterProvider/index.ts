import { BuildPlayer, RaidHelperSignups } from "../../types";

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

  public static async getRosterRaidPlayersSql(connectionString: string) : Promise<BuildPlayer[]>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/import/sql`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => response.json()).then((roster) => {
      return roster.players
    })
  }
}
