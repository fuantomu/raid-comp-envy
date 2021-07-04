import { GET, Path, PathParam, POST, Return } from "typescript-rest";
import { BuildDelegate } from "../delegate/build.delegate";
import { BuildType } from "../model/build.model";

@Path("/build")
export class BuildController {
  @GET
  @Path(":buildId")
  public async getBuild(@PathParam("buildId") buildId: string) {
    const build = await BuildDelegate.findByBuildId(buildId);
    return build ? build : Return.NoResponse;
  }

  @POST
  @Path("/create")
  public async createBuild(build: BuildType) {
    const newBuild = await BuildDelegate.createBuild(build);
    return { buildId: newBuild.buildId };
  }

  @POST
  @Path("/import/raid-helper")
  public async importRaidHelper({ raw }: { raw: string }) {
    return await BuildDelegate.createBuildFromRHByTeams(raw);
  }
}
