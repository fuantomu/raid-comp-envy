import { rest } from "msw";
import { InviteStatus, WarcraftPlayerSpec } from "../consts";
import { baseURL } from "../services/backend";
import { getBuildResponseData } from "../services/backend/types";

export default [
  rest.get(`${baseURL}/build/:buildId`, (req, res, { delay, json, status }) =>
    res(
      delay(),
      status(200),
      json({
        buildId: req.params.buildId,
        players: [
          {
            name: "Albionna",
            class: "Priest",
            spec: WarcraftPlayerSpec.PriestHoly,
            group: 1,
            status: InviteStatus.Accepted,
          },
        ],
        grouped: true,
      } as getBuildResponseData)
    )
  ),
];
