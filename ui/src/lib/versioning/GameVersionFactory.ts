import { error } from '@sveltejs/kit';
import { LiveIconProvider } from '$lib/versions/live/LiveIconProvider';
import type { GameVersion } from '$lib/versioning/GameVersion';
import { GameVersionSlug } from '$lib/versioning/GameVersion';
import { LiveGameVersion } from '$lib/versions/live/LiveGameVersion';
import type { IconProvider } from '$lib/versioning/IconProvider';
import type { VersionedContext } from '$lib/versioning/VersionedContext';
import { WotlkGameVersion } from '$lib/versions/wotlk/WotlkGameVersion';
import { WotlkIconProvider } from '$lib/versions/wotlk/WotlkconProvider';

export class GameVersionFactory {
	static createIconProvider(gameVersion: GameVersionSlug): IconProvider {
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new LiveIconProvider();
			case GameVersionSlug.WOTLK:
				return new WotlkIconProvider();
		}
		throw error(400, 'Game version not supported');
	}

	static createGameVersion(gameVersion: GameVersionSlug): GameVersion {
		switch (gameVersion) {
			case GameVersionSlug.LIVE:
				return new LiveGameVersion();
			case GameVersionSlug.WOTLK:
				return new WotlkGameVersion();
		}
		throw error(400, 'Game version not supported');
	}

	static getDefaultContext(): VersionedContext {
		return {
			iconProvider: GameVersionFactory.createIconProvider(GameVersionSlug.LIVE),
			gameVersion: new LiveGameVersion(),
		};
	}

	static getContext(gameVersion: GameVersionSlug): VersionedContext {
		return {
			iconProvider: GameVersionFactory.createIconProvider(gameVersion),
			gameVersion: GameVersionFactory.createGameVersion(gameVersion),
		};
	}
}
