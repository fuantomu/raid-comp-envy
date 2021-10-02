import { Errors, GET, Path, PathParam, POST } from "typescript-rest";
import { BuildDelegate } from "../delegate/build.delegate";
import { BuildCreateType, BuildType } from "../model/build.model";
import { BuildId, BuildResponse } from "../types";

@Path("/build")
export class BuildController {
  @GET
  @Path(":buildId")
  public async getBuild(@PathParam("buildId") buildId: string): Promise<BuildType> {
    const build = await BuildDelegate.findByBuildId(buildId);
    if (!build) {
      throw new Errors.NotFoundError();
    }
    return build;
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
