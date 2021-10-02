import { GET, Path } from "typescript-rest";

@Path("/health")
export class HealthController {
  @GET
  @Path("/")
  public getBuild(): { status: string } {
    return { status: "OK" };
  }
}
