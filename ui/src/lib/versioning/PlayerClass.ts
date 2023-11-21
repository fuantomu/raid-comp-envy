import type { RaidBuff } from '$lib/versioning/RaidBuff';
import type { RaidUtility } from '$lib/versioning/RaidUtility';
import type { SourcePlayerClass } from '$lib/versioning/GameVersionSource';

export class PlayerClass {
	private readonly _slug: string;
	private readonly _icon: string;
	private readonly _buffs: RaidBuff[];
	private readonly _utilities: RaidUtility[];

	private constructor(slug: string, icon: string, buffs: RaidBuff[], utilities: RaidUtility[]) {
		this._slug = slug;
		this._icon = icon;
		this._buffs = buffs;
		this._utilities = utilities;
	}

	get colour(): string {
		return `var(--player-class-colour-${this.slug})`;
	}

	get slug(): string {
		return this._slug;
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

	static fromSource(source: SourcePlayerClass, buffs: RaidBuff[], utilities: RaidUtility[]) {
		const matchingBuffs = buffs.filter((b) => source.buffs?.includes(b.slug));
		const matchingUtilities = utilities.filter((u) => source.utilities?.includes(u.slug));
		return new PlayerClass(source.slug, source.icon, matchingBuffs, matchingUtilities);
	}
}
