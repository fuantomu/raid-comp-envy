import * as request from "request";
import { HttpMethod, Server } from "typescript-rest";
import { ApiServer } from "../../api-server";
import { BuildModel, BuildType, PlayerType } from "../../model/build.model";

const apiServer: ApiServer = new ApiServer();
const buildRequest: request.RequestAPI<
  request.Request,
  request.CoreOptions,
  request.RequiredUriUrl
> = request.defaults({ baseUrl: `http://localhost:${apiServer.PORT}` });

describe("Build integration test", () => {
  const buildId = "123456";
  const name = "test name";
  const players: PlayerType[] = [];
  const expectedBuild = {
    buildId,
    name,
    players,
  } as BuildType;

  beforeAll(() => {
    return apiServer.start();
  });

  afterAll(() => {
    return apiServer.stop();
  });

  describe("The Rest Server", () => {
    it("should provide a catalog containing the exposed paths", () => {
      expect(Server.getPaths()).toContain("/build/:buildId");
      expect(Server.getHttpMethods("/build/:buildId")).toContain(HttpMethod.GET);
    });
  });

  describe("/build/:buildId", () => {
    jest.spyOn(BuildModel, "findOne").mockReturnValue(Promise.resolve(expectedBuild) as any);

    it("should return the build", (done) => {
      buildRequest(`/build/${buildId}`, (error: any, response, body) => {
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(body)).toEqual(expectedBuild);
        done();
      });
    });
  });
});
