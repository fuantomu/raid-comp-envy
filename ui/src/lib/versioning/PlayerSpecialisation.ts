import { PlayerRole } from '$lib/consts';
import type { PlayerClass } from '$lib/versioning/PlayerClass';
import type { RaidBuff } from '$lib/versioning/RaidBuff';
import type { RaidUtility } from '$lib/versioning/RaidUtility';
import type { SourcePlayerSpec } from '$lib/versioning/GameVersionSource';
import { error } from '@sveltejs/kit';

export class PlayerSpec {
	private readonly _slug: string;
	private readonly _playerClass: PlayerClass;
	private readonly _role: PlayerRole;
	private readonly _icon: string;
	private readonly _buffs: RaidBuff[];
	private readonly _utilities: RaidUtility[];

	private constructor(
		slug: string,
		playerClass: PlayerClass,
		role: PlayerRole,
		icon: string,
		buffs: RaidBuff[],
		utilities: RaidUtility[],
	) {
		this._slug = slug;
		this._playerClass = playerClass;
		this._role = role;
		this._icon = icon;
		this._buffs = buffs;
		this._utilities = utilities;
	}

	get slug(): string {
		return this._slug;
	}

	get playerClass(): PlayerClass {
		return this._playerClass;
	}

	get role(): PlayerRole {
		return this._role;
	}

	get icon(): string {
		return this._icon;
	}

	get buffs(): RaidBuff[] {
		return this._buffs;
	}

	get utilities(): RaidUtility[] {
		return this._utilities;
	}

	isTank(): boolean {
		return this._role === PlayerRole.Tank;
	}

	isHealer(): boolean {
		return this._role === PlayerRole.Healer;
	}

	isRangedDPS(): boolean {
		return this._role === PlayerRole.RangedDPS;
	}

	isMeleeDPS(): boolean {
		return this._role === PlayerRole.MeleeDPS;
	}

	static fromSource(
		source: SourcePlayerSpec,
		classes: PlayerClass[],
		buffs: RaidBuff[],
		utilities: RaidUtility[],
	) {
		const playerClass = classes.find((c) => c.slug === source.class);
		const matchingBuffs = buffs.filter((b) => source.buffs?.includes(b.slug));
		const matchingUtilities = utilities.filter((u) => source.utilities?.includes(u.slug));

		if (!playerClass) {
			throw error(500, 'Could not attribute player class to spec');
		}

		return new PlayerSpec(
			source.slug,
			playerClass,
			source.role,
			source.icon,
			matchingBuffs,
			matchingUtilities,
		);
	}
}
