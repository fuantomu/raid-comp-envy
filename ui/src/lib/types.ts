import type { InviteStatus } from '$lib/consts';
import type { PlayerClass } from '$lib/versioning/PlayerClass';
import type { PlayerSpec } from '$lib/versioning/PlayerSpecialisation';
import type { GameVersionSlug } from '$lib/versioning/GameVersion';

export type BuildId = string;
export type GroupId = 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BuildPlayer = {
	id: string;
	name: string;
	realm?: string;
	class: PlayerClass;
	spec?: PlayerSpec;
	status: InviteStatus;
	group?: GroupId;
};

export type Build = {
	gameVersion: GameVersionSlug;
	buildId: BuildId;
	name: string;
	players: BuildPlayer[];
};
