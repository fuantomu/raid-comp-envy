import { BuildPlayer } from "../../types";

export abstract class PlayerUtils {
  public static getFullName(player: BuildPlayer) {
    return player ? `${player.name}${player.realm ? `-${player.realm}` : ""}` : "";
  }
} 