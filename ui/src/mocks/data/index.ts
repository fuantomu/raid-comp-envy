import type { Build } from "$lib/service/api";
import { GameVersionSlug } from "$lib/versioning/GameVersion";
import { livePlayers } from "./mock.data";

// only exported as a fallback, there should be no need to export the rest.
export const liveBuildWithVersion: Build = {
  gameVersion: GameVersionSlug.LIVE,
  buildId: "liveBuild",
  name: "Live build",
  players: livePlayers
};

const liveBuildWithNoVersion: Build = {
  buildId: "liveNoVerBuild",
  name: "Live build without version",
  players: livePlayers
};

const wotlkBuild: Build = {
  gameVersion: GameVersionSlug.WOTLK,
  buildId: "wotlkBuild",
  name: "WOTLK build",
  players: []
};


export const mockBuilds = [liveBuildWithVersion, liveBuildWithNoVersion, wotlkBuild];