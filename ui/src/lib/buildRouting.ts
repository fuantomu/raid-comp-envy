import { validateVersion } from "$lib/versioning/validate";
import type { Build } from "$lib/service/api";
import { GameVersionSlug } from "$lib/versioning/GameVersion";

type VersionedPageParams = {
  gameVersion?: string;
};

type BuildPageParams = VersionedPageParams & {
  buildId: string;
  buildName?: string;
};

export type EditBuildPageParams = {
  buildId?: string;
  buildName?: string;
  gameVersion: GameVersionSlug
};

export type ViewBuildPageParams = {
  buildId: string;
  buildName?: string;
  gameVersion: GameVersionSlug
};

export const constructParameters = (params: BuildPageParams): ViewBuildPageParams => {
  return {
    gameVersion: validateVersion(params.gameVersion),
    buildId: params.buildId,
    buildName: params.buildName
  };
};

export const constructCreateParameters = (params: { gameVersion?: string }) => {
  return {
    gameVersion: validateVersion(params.gameVersion)
  };
};

export const routeToCorrectBuildUrl = (gameVersion: GameVersionSlug, build: Build, edit: boolean = false) => {
  const buildUrl = `/build/${build.buildId}${edit ? "/edit" : ""}`;
  if (!build.gameVersion && gameVersion !== GameVersionSlug.LIVE) {
    window.location.href = `/${GameVersionSlug.LIVE}${buildUrl}`;
  } else if (build.gameVersion && build.gameVersion !== gameVersion) {
    window.location.href = `/${build.gameVersion}${buildUrl}`;
  }
};
