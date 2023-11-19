import { error } from '@sveltejs/kit';
import { GameVersionSlug } from '$lib/versioning/GameVersion';

export const validateVersion = (version?: string): GameVersionSlug => {
	if (!version) return GameVersionSlug.LIVE;

	const lookup = Object.entries(GameVersionSlug).find(([, k]) => k === version)?.[1];
	if (lookup) {
		return lookup;
	}

	throw error(400, 'Game version not supported');
};
