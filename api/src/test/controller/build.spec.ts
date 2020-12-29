import { BuildController } from "../../controller/build.controller";
import BuildModel, { BuildDocument } from "../../model/build-model";
import { BuildPlayer } from "../../types";

describe("Build controller test", () => {
  const buildId = "123456";
  const name = "test name";
  const players: BuildPlayer[] = [];
  const expectedBuild = {
    buildId,
    name,
    players,
  } as BuildDocument;
  let controller = new BuildController();

  describe("/build/:buildId", () => {
    it("should work", async () => {
      jest.spyOn(BuildModel, "findOne").mockReturnValue(Promise.resolve(expectedBuild) as any);

      const actualBuild = await controller.getBuild(buildId);

      expect(actualBuild).toBe(expectedBuild);
    });
  });
});
