import { GET, Path } from "typescript-rest";

@Path("/health")
export class HealthController {
  @GET
  @Path("/")
  public async getBuild() {
    return { status: "OK" };
  }
}
