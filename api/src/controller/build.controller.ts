import { GET, Path, PathParam, POST, Return } from "typescript-rest";
import { BuildDelegate } from "../service/build-delegate";
import { BuildType } from "../types";

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
  public async postBuild(build: BuildType) {
    await BuildDelegate.createBuild(build);
  }
}
