import type { PlayerRole } from '$lib/consts';

export interface IconProvider {
	getVersionIcon(size?: string): string;

	getSrc(icon: string, size?: string): string;

	getForRole(role: PlayerRole, size?: string): string;
}
