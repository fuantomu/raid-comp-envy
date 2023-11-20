import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { isMockEnabled } from '$lib';
import MockAdapter from 'axios-mock-adapter';
import { mockRoutes } from '../../mocks/mock.routes';
import type { InviteStatus } from '$lib/consts';
import { dev } from '$app/environment';
import type { Build as ModelBuild } from '$lib/types';
import type { GameVersionSlug } from '$lib/versioning/GameVersion';

const service = axios.create({
	baseURL: dev ? 'http://localhost:7071' : '/api',
});

if (isMockEnabled()) {
	const mockAdapter = new MockAdapter(service, { delayResponse: 1000 });
	mockRoutes(mockAdapter);
}

service.interceptors.response.use(
	(response) => response,
	// (error: AxiosError) => {
	// 	console.log(error.stack);
	//
	// 	let reject;
	// 	switch (error.status) {
	// 		case 404:
	// 			reject = new ApiNotFoundError(error.message, { cause: error });
	// 			break;
	// 		default:
	// 			reject = new ApiNetworkError(error.message, { cause: error });
	// 			break;
	// 	}
	//
	// 	return Promise.reject(reject);
	// },
);

export const getBuild = (buildId: string, config?: AxiosRequestConfig) =>
	service.get<Build>(`/builds/${buildId}`, config);

export const createBuild = (data: Omit<Build, 'buildId'>, config?: AxiosRequestConfig) =>
	service.post<{ buildId: string }>(`/builds`, data, config);

type GroupId = 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type BuildPlayer = {
	id?: string;
	name: string;
	realm?: string;
	class: string;
	spec?: string;
	status: InviteStatus;
	group?: GroupId;
};

export type Build = {
	gameVersion?: GameVersionSlug;
	buildId: string;
	name: string;
	players: BuildPlayer[];
};

export const mapToApi = (build: ModelBuild): Build => ({
	gameVersion: build.gameVersion,
	buildId: build.buildId,
	name: build.name,
	players: build.players.map((p) => ({
		id: p.id,
		name: p.name,
		class: p.class.slug,
		spec: p.spec?.slug,
		status: p.status,
		group: p.group,
	})),
});
