import axios from "axios";
import {
  AbsenceResponse,
  BuildPlayer,
  BuildPlayerResponse,
  BuildResponse,
  DiscordMessageResponse,
  Login,
  UpdateResponse,
  WebSocketMessage
} from "../../types";

export abstract class RosterProvider {
  public static async getPlayers(): Promise<BuildPlayer[]> {
    return await fetch(`${process.env.REACT_APP_API}/player/`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((roster) => {
        return roster;
      });
  }

  public static async saveBuild(build_id: string, build: BuildResponse): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/build/${build_id}`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(build)
    }).then((response) => {
      return response;
    });
  }

  public static async getRaid(build_id: string): Promise<BuildResponse> {
    return await fetch(`${process.env.REACT_APP_API}/build/${build_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 404) {
          return { id: build_id } as BuildResponse;
        }
      })
      .then((roster) => {
        return roster;
      });
  }

  public static async deleteBuild(id: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/build/delete/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response;
    });
  }

  public static async saveRoster(roster: BuildPlayerResponse): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/player/`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roster)
    }).then((response) => {
      return response;
    });
  }

  public static async deleteRosterPlayer(player_id: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/player/delete/${player_id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response;
    });
  }

  public static async getBuilds(): Promise<BuildResponse[]> {
    return await fetch(`${process.env.REACT_APP_API}/build/`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((builds) => {
        return builds;
      });
  }

  public static async postSetup(build: string): Promise<any> {
    return await axios.post(`${process.env.REACT_APP_DISCORD_WEBHOOK}?wait=true`, build, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(({ data }) => {
        return data;
      });
  }

  public static async patchSetup(build: string, messageId: string): Promise<any> {
      return await axios.patch(`${process.env.REACT_APP_DISCORD_WEBHOOK}/messages/${messageId}`, build, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then(({ data }) => {
          return data;
        });
    }

  public static async getAbsences(): Promise<AbsenceResponse[]> {
    return await fetch(`${process.env.REACT_APP_API}/absence/`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((absence) => {
        return absence;
      });
  }

  public static async deleteAbsence(id: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/absence/delete/${id}`, {
      method: "POST",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response;
    });
  }

  public static async getAccountLogin(username: string, hash: string): Promise<number> {
    return await fetch(`${process.env.REACT_APP_API}/account/${username}?hash=${hash}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response.json();
    });
  }

  public static async getLoginAge(host: string): Promise<Login> {
    return await fetch(`${process.env.REACT_APP_API}/login/${host}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response.json();
    });
  }

  public static async saveLoginAge(host: string, body: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/login/${host}`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body
    }).then((response) => {
      return response;
    });
  }

  public static async deleteLogin(host: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/login/delete/${host}`, {
      method: "POST",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response;
    });
  }

  public static async saveAccountLogin(username: string, hash: string): Promise<number> {
    return await fetch(`${process.env.REACT_APP_API}/account/${username}`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: hash
    }).then((response) => {
      return response.json();
    });
  }

  public static async getUpdate(): Promise<UpdateResponse> {
    return await fetch(`${process.env.REACT_APP_API}/update/`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((update) => {
        return update;
      });
  }

  public static async getMessages(amount: number): Promise<WebSocketMessage[]> {
    return await fetch(`${process.env.REACT_APP_API}/message/${amount}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((message) => {
        return message;
      });
  }

  public static async getDiscordMessages(): Promise<DiscordMessageResponse[]> {
    return await fetch(`${process.env.REACT_APP_API}/discord/`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    })
      .then((response) => response.json())
      .then((messages) => {
        return messages;
      });
  }

  public static async saveDiscordMessage(messageId: string, buildId: string, note: string): Promise<number> {
    return await axios.post(`${process.env.REACT_APP_API}/discord/${buildId}`, {"messageId": messageId, "note": note}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then(({ data }) => {
        return data;
    });
  }

  public static async deleteDiscordMessage(buildId: string): Promise<Response> {
    return await fetch(`${process.env.REACT_APP_API}/discord/delete/${buildId}`, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((response) => {
      return response;
    });
  }
}
