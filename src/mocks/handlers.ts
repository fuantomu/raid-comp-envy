import { rest } from "msw";
import { baseURL } from "../services/backend";
import { Build } from "../types";
import { BUILD_GROUPED, BUILD_UNGROUPED } from "./builds/grouped";

const builds: any = {};

export default [
  rest.get(`${baseURL}/build/:buildId`, (req, res, { delay, json, status }) =>
    {
      let build = builds[req.params.buildId];
      switch (req.params.buildId) {
        case "grouped0": build = BUILD_UNGROUPED; break;
        case "grouped1": build = BUILD_GROUPED; break;
      }
      return res(delay(), status(200), json(build));
    }
  ),
  rest.post(`${baseURL}/build/create`, (req, res, { delay, json, status }) => {
    const build = req.body as Build;
    build.buildId = Math.random().toString().replace(/[^\d]/g, "").substr(0, 8);
    builds[build.buildId] = build;
    return res(json({
      buildId: build.buildId
    }));
  })
];
