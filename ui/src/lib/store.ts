import { writable } from 'svelte/store';
import { GameVersionFactory } from '$lib/versioning/GameVersionFactory';
import type { Build } from '$lib/types';
import type { VersionedContext } from '$lib/versioning/VersionedContext';

export const context = writable<VersionedContext>(GameVersionFactory.getDefaultContext());

export const build = writable<Build>({
	buildId: '',
	name: '',
	players: [],
});
export const displayGrouped = writable<boolean>(false);
export const resetBuildDialogOpen = writable<boolean>(false);
export const saveBuildDialogOpen = writable<boolean>(false);
export const editPlayerDialogOpen = writable<boolean>(false);
export const editing = writable<boolean>(false);
export const currentlyEditingPlayerId = writable<string | null>();
