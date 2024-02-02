import { BuildPlayer, BuildPlayerResponse } from "../../types";
import { RosterProvider } from "../RosterProvider";

export abstract class RosterHelper {
  public static isAlt(potentialAlt: BuildPlayer, character: BuildPlayer): boolean {
    if (
      potentialAlt.id !== character.id &&
      (potentialAlt.main === character.name || potentialAlt.main === character.main)
    ) {
      return true;
    }
    return false;
  }

  public static getAlts(player: BuildPlayer, roster: BuildPlayer[]): BuildPlayer[] {
    return roster.filter((rosterPlayer) => this.isAlt(rosterPlayer, player));
  }

  public static getMains(players: BuildPlayer[]): BuildPlayer[] {
    return players.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name;
    });
  }

  public static async saveRoster(players: BuildPlayer[]) {
    const savePlayers = [...players];
    const buildPlayerRequest: BuildPlayerResponse = {
      players: savePlayers
    };
    await RosterProvider.saveRoster(buildPlayerRequest).then((response) => {});
  }

  public static async removeRosterPlayer(player: BuildPlayer) {
    await RosterProvider.deleteRosterPlayer(player.id).then((response) => {});
  }
}
