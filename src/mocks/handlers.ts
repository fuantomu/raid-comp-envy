import { delay, http, HttpResponse } from "msw";
import { baseURL } from "../services/backend";
import { Build } from "../types";
import { BUILD_GROUPED, BUILD_UNGROUPED } from "./builds/grouped";

const builds: any = {};

export default [
  http.get(`${baseURL}/builds/:buildId`, async ({ params }) => {
      let build = builds[params.buildId as string];
      switch (params.buildId) {
        case "grouped0":
          build = BUILD_UNGROUPED;
          break;
        case "grouped1":
          build = BUILD_GROUPED;
          break;
      }
      await delay();
      return HttpResponse.json(build, { status: 200 });
    }
  ),
  http.post(`${baseURL}/builds`, async ({ request }) => {
    const build = (await request.json()) as Build;
    build.buildId = Math.random().toString().replace(/[^\d]/g, "").substring(0, 8);
    builds[build.buildId] = build;
    await delay();
    return HttpResponse.json({
      buildId: build.buildId
    }, { status: 201 });
  })
];
