import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { isMockEnabled } from "$lib";
import MockAdapter from "axios-mock-adapter";
import { mockRoutes } from "../../mocks/mock.routes";
import type { InviteStatus } from "$lib/consts";
import { dev } from "$app/environment";
import type { Build as ModelBuild } from "$lib/types";
import type { GameVersionSlug } from "$lib/versioning/GameVersion";
import fetchAdapter from "@haverstack/axios-fetch-adapter";
import { ApiError, AppErrorId } from "$lib/service/error";

const service = axios.create({
  baseURL: dev ? "http://localhost:7071" : "/api",
  adapter: fetchAdapter
});

if (isMockEnabled()) {
  const mockAdapter = new MockAdapter(service, { delayResponse: 1000 });
  mockRoutes(mockAdapter);
}

service.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(error);

    const status = error.response?.status;
    let errorId: AppErrorId;
    if (status === 400) {
      errorId = AppErrorId.Api400;
    } else if (status === 404) {
      errorId = AppErrorId.Api404;
    } else if (axios.isCancel(error)) {
      errorId = AppErrorId.ApiCancelled;
    } else {
      errorId = AppErrorId.Unspecific;
    }

    return Promise.reject(new ApiError(errorId, error));
  }
);

export const getBuild = (buildId: string, config?: AxiosRequestConfig) =>
  service.get<Build>(`/builds/${buildId}`, config);

export const createBuild = (data: createBuildRequest, config?: AxiosRequestConfig) =>
  service.post<{ buildId: string }>(`/builds`, data, config);

type GroupId = "none" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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
    group: p.group
  }))
});

export type createBuildRequest = Omit<Build, "buildId"> & {
  token: string;
}