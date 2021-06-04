import { Query } from "mongoose";
import * as sha256 from "sha256";
import { RaidTeam } from "../mappers/discord-player";
import BuildModel, { BuildDocument } from "../model/build-model";
import { BuildId, BuildResponse, BuildType } from "../types";
import { PlayerUtil } from "../util/player.util";
import { RaidHelper } from "../util/raid-helper";

export abstract class BuildDelegate {
  public static async findByBuildId(buildId: BuildId): Promise<BuildDocument> {
    const build = await BuildModel.findOne({ buildId });
    this.updateBuildLastSeen(build);
    return build;
  }

  public static deleteOldBuilds(
    maxAgeDays: number
  ): Query<{ ok?: number; n?: number }, BuildDocument> {
    const nowMillis = new Date().getTime();
    const minDate = new Date(nowMillis - maxAgeDays * 24 * 60 * 60 * 1000);
    return BuildModel.deleteMany({ lastSeen: { $lt: minDate } });
  }

  public static updateBuildLastSeen(build?: BuildDocument): void {
    if (!build) {
      return;
    }
    BuildModel.updateOne({ _id: build._id }, { lastSeen: new Date() }).catch(console.error);
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

  public static async createBuildFromRHByTeams(raw: string): Promise<{
    builds: BuildResponse[];
  }> {
    const builds = await RaidHelper.createBuildFromRHByTeams(raw);
    return {
      builds: [
        {
          ...(await BuildDelegate.createBuild(builds[RaidTeam.BF])),
          team: RaidTeam.BF,
        },
        {
          ...(await BuildDelegate.createBuild(builds[RaidTeam.HC])),
          team: RaidTeam.HC,
        },
      ],
    };
  }

  public static async createBuildFromRH(raw: string) {
    const build = await RaidHelper.createBuildFromRH(raw);
    return {
      builds: [
        {
          ...(await BuildDelegate.createBuild(build)),
          team: "All",
        },
      ],
    };
  }
}
