import * as sha256 from "sha256";
import BuildModel, { BuildDocument } from "../model/build-model";
import { BuildId, BuildType } from "../types";

export abstract class BuildDelegate {
  public static async findByBuildId(buildId: BuildId): Promise<BuildDocument> {
    return await BuildModel.findOne({ buildId });
  }

  public static async createBuild(build: BuildType) {
    return await BuildModel.create({
      ...build,
      buildId: sha256(`${Math.random()}_${new Date()}`).substr(0, 8),
    });
  }
}
