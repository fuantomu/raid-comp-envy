import { Return } from "typescript-rest";
import { BuildController } from "../../controller/build.controller";
import { BuildDelegate } from "../../delegate/build.delegate";
import { BuildType, PlayerType } from "../../model/build.model";

describe("Build Controller Test", () => {
  const buildId = "123456";
  const name = "test name";
  const players: PlayerType[] = [];
  const expectedBuild = {
    buildId,
    name,
    players,
  } as BuildType;
  let controller = new BuildController();

  describe("getBuild", () => {
    it("should return the build if found", async () => {
      jest.spyOn(BuildDelegate, "findByBuildId").mockReturnValue(Promise.resolve(expectedBuild));
      const actualBuild = await controller.getBuild(buildId);
      expect(actualBuild).toBe(expectedBuild);
    });

    it("should return nothing if no build found", async () => {
      jest.spyOn(BuildDelegate, "findByBuildId").mockReturnValue(Promise.resolve(null));
      const actualBuild = await controller.getBuild(buildId);
      expect(actualBuild).toBe(Return.NoResponse);
    });
  });

  describe("createBuild", () => {
    // it("should return the build if created", async () => {
    //   jest.spyOn(BuildDelegate, "createBuild").mockReturnValue(Promise.resolve(expectedBuild));
    //   const actualBuild = await controller.createBuild(expectedBuild);
    //   expect(actualBuild).not.toEqual(expectedBuild);
    //   expect(actualBuild).toEqual(undefined);
    // });

    it("should return an error if schema not met", async () => {
      jest.spyOn(BuildDelegate, "createBuild").mockRejectedValue("ERROR");
      await expect(controller.createBuild({} as any)).rejects.toBe("ERROR");
    });
  });
});
