import { GameVersion, GameVersionSlug } from '$lib/versioning/GameVersion';
import { versionSource } from '$lib/versions/live/source';

export class LiveGameVersion extends GameVersion {
	constructor() {
		super(versionSource);
	}

	getSlug(): GameVersionSlug {
		return GameVersionSlug.LIVE;
	}
}
