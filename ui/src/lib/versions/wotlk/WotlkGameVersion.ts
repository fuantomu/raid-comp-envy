import { GameVersion, GameVersionSlug } from '$lib/versioning/GameVersion';

export class WotlkGameVersion extends GameVersion {
	constructor() {
		super({
			buffs: [],
			specs: [],
			classes: [],
			utilities: [],
		});
	}

	getSlug(): GameVersionSlug {
		return GameVersionSlug.WOTLK;
	}
}
