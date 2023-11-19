import { GameVersion, GameVersionSlug } from "$lib/versioning/GameVersion";
import { versionSource } from "$lib/versions/wotlk/source";

export class WotlkGameVersion extends GameVersion {
  constructor() {
    super(versionSource);
  }

  getSlug(): GameVersionSlug {
    return GameVersionSlug.WOTLK;
  }
}
