import type MockAdapter from "axios-mock-adapter";
import { liveBuildWithVersion, mockBuilds } from "./data";
import type { Build } from "$lib/service/api";

export const mockRoutes = (ma: MockAdapter) => {
  const buildMatcher = new RegExp("^/builds/(?<buildId>[^/]+)$");
  ma.onGet(buildMatcher).reply<Build>((config) => {
    const buildId = config.url?.match(buildMatcher)?.groups?.["buildId"];
    const build = mockBuilds.find((b) => b.buildId === buildId) ?? liveBuildWithVersion;
    return [200, build];
  });

  ma.onPost("/builds").reply(201, { buildId: "foo" });
  // ma.onPost('/builds').reply(400, { message: 'some error' });
};
