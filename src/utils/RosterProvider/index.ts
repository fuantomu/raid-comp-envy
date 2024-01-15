import { AbsenceResponse, BuildPlayer, BuildPlayerResponse, BuildResponse } from "../../types";

export abstract class RosterProvider {
  public static async getPlayers() : Promise<BuildPlayer[]>{
    return await fetch(`${process.env.REACT_APP_API}/player/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
      if(response.ok){
        return response.json()
      }
    }).then((roster) => {
      return roster
    })
  }

  public static async saveBuild(buildId: string, build: BuildResponse) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_API}/build/${buildId}`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(build)}).then((response) => {
      return response
    })
  }

  public static async getBuild(buildId: string) : Promise<BuildResponse>{
    return await fetch(`${process.env.REACT_APP_API}/build/${buildId}`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
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
    return await fetch(`${process.env.REACT_APP_API}/build/delete/${buildId}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {
      return response
    })
  }

  public static async saveRoster(roster: BuildPlayerResponse) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_API}/player/`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: JSON.stringify(roster)}).then((response) => {
      return response
    })
  }

  public static async deleteRosterPlayer(playerId: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_API}/player/delete/${playerId}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {return response})
  }

  public static async getBuilds() : Promise<BuildResponse[]>{
    return await fetch(`${process.env.REACT_APP_API}/build/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => response.json()).then((builds) => {
      return builds
    })
  }

  public static async postSetup(build: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_DISCORD_WEBHOOK}`, {method: "POST", mode:"cors",credentials:"include", headers: {"Content-Type": "application/json"}, body: build}).then((response) => {return response})
  }

  public static async getAbsences() : Promise<AbsenceResponse[]>{
    return await fetch(`${process.env.REACT_APP_API}/absence/`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => response.json()).then((absence) => {
      return absence
    })
  }

  public static async getAccountLogin(username: string, hash: string) : Promise<number>{
    return await fetch(`${process.env.REACT_APP_API}/account/${username}?hash=${hash}`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
      return response.json()
    })
  }

  public static async getLoginAge(host: string) : Promise<number>{
    return await fetch(`${process.env.REACT_APP_API}/login/${host}`, {method: "GET", mode:"cors",credentials:"include"}).then((response) => {
      return response.json()
    })
  }

  public static async saveLoginAge(host: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_API}/login/${host}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {
      return response
    })
  }

  public static async deleteLogin(host: string) : Promise<Response>{
    return await fetch(`${process.env.REACT_APP_API}/login/delete/${host}`, {method: "POST", mode:"cors",credentials:"include"}).then((response) => {
      return response
    })
  }
}
