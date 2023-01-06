import { Errors, GET, Path, PathParam, POST } from "typescript-rest";
import { BuildDelegate } from "../delegate/build.delegate";
import { mapMeta } from "../mapper/build-meta.mapper";
import { BuildCreateType, BuildMeta, BuildType } from "../model/build.model";
import { BuildId, BuildResponse } from "../types";

@Path("/build")
export class BuildController {
  private async getSingleBuild(buildId: string): Promise<BuildType> {
    const build = await BuildDelegate.findByBuildId(buildId);
    if (!build) {
      throw new Errors.NotFoundError();
    }
    return build;
  }

  @GET
  @Path(":buildId")
  public async getBuild(@PathParam("buildId") buildId: string): Promise<BuildType> {
    return this.getSingleBuild(buildId);
  }

  @GET
  @Path(":buildId/meta")
  public async getBuildMeta(@PathParam("buildId") buildId: string): Promise<BuildMeta> {
    const build = await this.getSingleBuild(buildId);
    return mapMeta(build);
  }

  @POST
  @Path("/create")
  public async createBuild(build: BuildCreateType): Promise<{ buildId: BuildId }> {
    const newBuild = await BuildDelegate.createBuild(build);
    return { buildId: newBuild.buildId };
  }

  @POST
  @Path("/import/raid-helper")
  public async importRaidHelper({ raw }: { raw: string }): Promise<{
    builds: BuildResponse[];
  }> {
    return await BuildDelegate.createBuildFromRHByTeams(raw);
  }
}
