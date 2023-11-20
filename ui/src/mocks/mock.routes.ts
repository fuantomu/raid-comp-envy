import type MockAdapter from "axios-mock-adapter";
import { liveBuildWithVersion, mockBuilds } from "./data";
import type { Build } from "$lib/service/api";

export const mockRoutes = (ma: MockAdapter) => {
  const buildMatcher = new RegExp("^/builds/(?<buildId>[^/]+)$");
  ma.onGet(buildMatcher).reply<Build>(async (config) => {
    const buildId = config.url?.match(buildMatcher)?.groups?.["buildId"];
    const build = mockBuilds.find((b) => b.buildId === buildId) ?? liveBuildWithVersion;
    return [200, build];
  });

  ma.onPost('/builds').reply((config) => {
    const build = JSON.parse(config.data) as Build;
    if (build.name.includes("400")) {
      return [400, { message: 'some error' }];
    }
    return [201, { buildId: "foo" }];
  });
};
