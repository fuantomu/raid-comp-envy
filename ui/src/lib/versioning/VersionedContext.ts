import type { GameVersion } from '$lib/versioning/GameVersion';
import type { IconProvider } from '$lib/versioning/IconProvider';

export type VersionedContext = {
	iconProvider: IconProvider;
	gameVersion: GameVersion;
};
