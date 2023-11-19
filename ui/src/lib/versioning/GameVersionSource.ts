import type { PlayerRole } from '$lib/consts';

export type GameVersionSource = {
	buffs: SourceBuff[];
	utilities: SourceUtility[];
	classes: SourcePlayerClass[];
	specs: SourcePlayerSpec[];
};

export type SourceBuff = {
	slug: string;
	icon: string;
};

export type SourceUtility = {
	slug: string;
	icon: string;
};

export type SourcePlayerClass = {
	slug: string;
	icon: string;
	buffs?: string[];
	utilities?: string[];
};

export type SourcePlayerSpec = {
	slug: string;
	class: string;
	role: PlayerRole;
	icon: string;
	buffs?: string[];
	utilities?: string[];
};
