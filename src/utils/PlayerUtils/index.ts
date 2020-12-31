import { BuildPlayer } from "../../types";

export abstract class PlayerUtils {
  public static getFullName(player: BuildPlayer) {
    return player ? `${player.name}${player.realm ? `-${player.realm}` : ""}` : "";
  }

  public static splitFullName(fullName: string): {
      name: string;
      realm: string;
    } {
    return (fullName ?? "").match(/^(?<name>.*?)(?:-(?<realm>\w.*))?$/)
      ?.groups as {
      name: string;
      realm: string;
    }
  }
} 