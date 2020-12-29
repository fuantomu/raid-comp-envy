import BuildModel, { BuildDocument } from "../../model/build-model";
import { BuildDelegate } from "../../service/build-delegate";
import { BuildPlayer } from "../../types";

describe("Build Delegate Test", () => {
  const buildId = "123456";
  const newBuildId = "abcdef";
  const name = "test name";
  const players: BuildPlayer[] = [];
  const expectedBuild = {
    buildId,
    name,
    players,
  } as BuildDocument;

  describe("findByBuildId", () => {
    beforeEach(() => {
      jest.spyOn(BuildModel, "findOne").mockReturnValue(Promise.resolve(expectedBuild) as any);
    });

    it("should return a promise", () => {
      expect(BuildDelegate.findByBuildId(buildId)).toBeInstanceOf(Promise);
    });

    it("should return the build if found", () => {
      expect(BuildDelegate.findByBuildId(buildId)).toEqual(Promise.resolve(expectedBuild));
    });

    it("should return null if not found", () => {
      expect(BuildDelegate.findByBuildId("")).toEqual(Promise.resolve(null));
    });
  });

  describe("createBuild", () => {
    beforeEach(() => {
      jest.spyOn(BuildModel, "create").mockReturnValue(
        Promise.resolve({
          ...expectedBuild,
          buildId: newBuildId,
        }) as any
      );
    });

    it("should return a promise", () => {
      expect(BuildDelegate.createBuild(expectedBuild)).toBeInstanceOf(Promise);
    });

    it("should return the build if created", async () => {
      const actualBuild = await BuildDelegate.createBuild(expectedBuild);
      expect(actualBuild).not.toEqual(expectedBuild);
      expect(actualBuild).toEqual(
        expect.objectContaining({
          ...expectedBuild,
          buildId: newBuildId,
        })
      );
    });

    it("should throw an error if schema not met", async () => {
      jest.spyOn(BuildModel, "create").mockRejectedValue("ERROR");
      await expect(BuildDelegate.createBuild(expectedBuild)).rejects.toEqual("ERROR");
    });
  });
});
