import { handleApi, handleFrontend } from "./handlers";
import { Env } from "./types";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    var url = new URL(request.url);
    if (url.pathname.startsWith("/api/") || url.pathname === "/api") {
      return handleApi({ request, url, env });
    } else {
      return handleFrontend({ request, url, env });
    }
  },
};
