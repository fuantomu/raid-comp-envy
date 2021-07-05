import * as sha256 from "sha256";
import { BuildModel, BuildType } from "../model/build.model";
import { RaidHelper } from "../service/raid-helper.service";
import { BuildId, BuildResponse, EntityType } from "../types";
import { AsyncFactory } from "../util/async-factory";

export abstract class BuildDelegate {
  public static async findByBuildId(buildId: BuildId): Promise<BuildType | undefined> {
    const build = await BuildModel.findOne({ buildId });
    this.updateBuildLastSeen(build);
    return build?.entityData;
  }

  public static async deleteOldBuilds(maxAgeDays: number) {
    const nowMillis = new Date().getTime();
    const minDate = new Date(nowMillis - maxAgeDays * 24 * 60 * 60 * 1000);
    const builds = await BuildModel.list({
      filters: ["lastSeen", "<=", minDate],
      format: "ENTITY",
    });
    builds.entities.forEach((build) => {
      BuildModel.delete(build.id);
    });
    return builds.entities.length;
  }

  public static updateBuildLastSeen(build?: EntityType<BuildType>): void {
    if (build) {
      build.lastSeen = new Date();
      build.save().catch(console.error);
    }
  }

  public static async createBuild({ name, players }: BuildType): Promise<BuildResponse> {
    const build = new BuildModel({
      buildId: sha256(`${Math.random()}_${new Date()}`).substr(0, 8),
      name: name.substr(0, 500),
      players: players,
    });
    await build.save();
    return {
      buildId: build.buildId,
      buildName: build.name.replace(/[^\w]/g, "-"),
    };
  }

  public static async createBuildFromRHByTeams(raw: string): Promise<{
    builds: BuildResponse[];
  }> {
    const raidHelper = await AsyncFactory.getInstance(RaidHelper);
    const builds = await Promise.all(
      raidHelper.createBuildFromRHByTeams(raw).map(this.createBuild)
    );
    return { builds };
  }
}
