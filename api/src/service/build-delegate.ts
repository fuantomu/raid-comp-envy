import * as sha256 from "sha256";
import { RaidTeam } from "../mappers/discord-player";
import BuildModel, { BuildDocument } from "../model/build-model";
import { BuildId, BuildResponse, BuildType } from "../types";
import { PlayerUtil } from "../util/player.util";
import { RaidHelper } from "../util/raid-helper";

export abstract class BuildDelegate {
  public static async findByBuildId(buildId: BuildId): Promise<BuildDocument> {
    return await BuildModel.findOne({ buildId });
  }

  public static async createBuild({ name, players }: BuildType): Promise<BuildResponse> {
    const build = await BuildModel.create({
      buildId: sha256(`${Math.random()}_${new Date()}`).substr(0, 8),
      name: name.substr(0, 500),
      players: players.map(PlayerUtil.sanitizePlayer),
    });
    return {
      buildId: build.buildId,
      buildName: build.name.replace(/[^\w]/g, "-"),
    };
  }

  public static async createBuildsFromRH(
    raw: string
  ): Promise<{
    builds: BuildResponse[];
  }> {
    const builds = RaidHelper.createBuildsFromRH(raw);
    return {
      builds: [{
        ...(await BuildDelegate.createBuild(builds[RaidTeam.BF])),
        team: RaidTeam.BF
      }, {
        ...(await BuildDelegate.createBuild(builds[RaidTeam.HC])),
        team: RaidTeam.HC
      }],
    };
  }
}
