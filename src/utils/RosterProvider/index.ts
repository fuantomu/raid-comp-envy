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
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/import`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => response.json()).then((roster) => {
      return roster.players
    })
  }

  public static async saveBuildPlayersSql(connectionString: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/save`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => {return response})
  }

  public static async loadBuildPlayersSql(connectionString: string) : Promise<string>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/load`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => response.json()).then((roster) => {
      return roster.players
    })
  }

  public static async deleteBuildPlayersSql(connectionString: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/delete`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => {return response})
  }

  public static async saveRosterPlayersSql(connectionString: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/saveRoster`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => {return response})
  }

  public static async deleteRosterPlayersSql(connectionString: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/deleteFromRoster`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => {return response})
  }

  public static async loadBuildsSql(connectionString: string) : Promise<string[]>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/sql/loadBuilds`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: connectionString}).then((response) => response.json()).then((builds) => {
      return builds.builds
    })
  }

  public static async postSetup(build: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_DISCORD_WEBHOOK}`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: build}).then((response) => {return response})
  }
}
