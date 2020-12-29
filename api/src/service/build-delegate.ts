import * as sha256 from "sha256";
import { PlayerUtil } from "../../src/util/player.util";
import BuildModel, { BuildDocument } from "../model/build-model";
import { BuildId, BuildType } from "../types";

export abstract class BuildDelegate {
  public static async findByBuildId(buildId: BuildId): Promise<BuildDocument> {
    return await BuildModel.findOne({ buildId });
  }

  public static async createBuild({name, players}: BuildType) {
    return await BuildModel.create({
        buildId: sha256(`${Math.random()}_${new Date()}`).substr(0, 8),
        name: name.substr(0, 500),
        players: players.map(PlayerUtil.sanitizePlayer)
      });
  }
}
