import { rest } from "msw";
import { baseURL } from "../services/backend";

export default [
  rest.get(`${baseURL}/build/:buildId`, (req, res, { delay, json, status }) =>
    res(
      delay(1000),
      status(200),
      json({
        buildId: req.params.buildId,
        test: "Excepteur dolore deserunt mollit et laboris amet ullamco.",
      })
    )
  ),
];
