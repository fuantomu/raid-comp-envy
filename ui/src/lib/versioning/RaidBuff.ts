import type { SourceBuff } from '$lib/versioning/GameVersionSource';

export class RaidBuff {
	private readonly _slug: string;
	private readonly _icon: string;

	private constructor(slug: string, icon: string) {
		this._slug = slug;
		this._icon = icon;
	}

	get slug(): string {
		return this._slug;
	}

	get icon(): string {
		return this._icon;
	}

	static fromSource({ slug, icon }: SourceBuff) {
		return new RaidBuff(slug, icon);
	}
}
