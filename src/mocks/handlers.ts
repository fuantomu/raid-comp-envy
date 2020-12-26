import { rest } from "msw";
import { baseURL } from "../services/backend";
import { BUILD_GROUPED, BUILD_UNGROUPED } from "./builds/grouped";

export default [
  rest.get(`${baseURL}/build/:buildId`, (req, res, { delay, json, status }) =>
    {
      let build = undefined;
      switch (req.params.buildId) {
        case "grouped0": build = BUILD_UNGROUPED; break;
        case "grouped1": build = BUILD_GROUPED; break;
      }
      return res(delay(), status(200), json(build));
    }
  ),
];
