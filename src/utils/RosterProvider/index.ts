import { Absence, BuildPlayer, BuildPlayerResponse, BuildResponse } from "../../types";

export abstract class RosterProvider {
  public static async getPlayers() : Promise<BuildPlayer[]>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/player/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
      if(response.ok){
        return response.json()
      }
    }).then((roster) => {
      return roster
    })
  }

  public static async saveBuild(buildId: string, build: BuildResponse) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/${buildId}`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(build)}).then((response) => {
      return response
    })
  }

  public static async getBuild(buildId: string) : Promise<BuildResponse>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/${buildId}`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
      if(response.ok){
        return response.json()
      }
      if(response.status === 404){
        return {"id":buildId} as BuildResponse
      }
    }).then((roster) => {
      return roster
    })
  }

  public static async deleteBuild(buildId: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/delete/${buildId}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {
      return response
    })
  }

  public static async saveRoster(roster: BuildPlayerResponse) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/player/`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(roster)}).then((response) => {
      return response
    })
  }

  public static async deleteRosterPlayer(playerId: string) : Promise<Response>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/player/delete/${playerId}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {return response})
  }

  public static async getBuilds() : Promise<BuildResponse[]>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/build/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => response.json()).then((builds) => {
      return builds
    })
  }

  public static async postSetup(build: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_DISCORD_WEBHOOK}`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: build}).then((response) => {return response})
  }

  public static async getAbsences() : Promise<Absence[]>{
    return await fetch(`http://${process.env.REACT_APP_BASEURL}:8080/absence/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => response.json()).then((absence) => {
      return absence
    })
  }
}
