import { validateVersion } from '$lib/versioning/validate';
import { getBuild } from '$lib/service/api';
import { GameVersionSlug } from '$lib/versioning/GameVersion';
import { goto } from '$app/navigation';

type VersionedPageParams = {
	gameVersion?: string;
};

type BuildPageParams = VersionedPageParams & {
	buildId: string;
	buildName?: string;
};

export const constructParameters = (params: BuildPageParams) => {
	return {
		gameVersion: validateVersion(params.gameVersion),
		buildId: params.buildId,
		buildName: params.buildName,
	};
};

export const constructCreateParameters = (params: { gameVersion?: string }) => {
	return {
		gameVersion: validateVersion(params.gameVersion),
	};
};

export const routeToCorrectBuildUrl = async (params: BuildPageParams, edit?: boolean) => {
	const parsed = constructParameters(params);
	const build = (await getBuild(parsed.buildId)).data;

	console.log('1');
	const buildUrl = `/build/${build.buildId}${edit ? '/edit' : ''}`;
	if (!build.gameVersion && parsed.gameVersion !== GameVersionSlug.LIVE) {
		console.log('2');
		await goto(`/${GameVersionSlug.LIVE}${buildUrl}`);
	} else if (build.gameVersion && build.gameVersion !== parsed.gameVersion) {
		console.log('3');
		await goto(`/${build.gameVersion}${buildUrl}`);
	}
	console.log('4');

	return {
		...parsed,
		build,
	};
};
