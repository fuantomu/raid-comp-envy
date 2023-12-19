import { BuildPlayer } from "../../types";

export abstract class PlayerUtils {
  public static getFullName(player: BuildPlayer) {
    return player ? `${player.name}` : ""
  }

  public static splitFullName(fullName: string): {
      name: string;
    } {
    return (fullName ?? "").match(/^(?<name>.*?)$/)
      ?.groups as {
      name: string;
    }
  }
}
