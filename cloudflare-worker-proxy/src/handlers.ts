import { HandlerParams } from "./types";
import { cloneRequest, getBuildId, getExtraHeaders } from "./utils";
import { rewriteMeta } from "./meta-rewriter";
import { cachedFetch } from "./cache";

export const handleFrontend = async ({
                                       url,
                                       request,
                                       env
                                     }: HandlerParams): Promise<Response> => {
  const redirect = url.toString().replace(new RegExp(`^${url.origin}`), env.FRONTEND_URL);
  let response = await cachedFetch(cloneRequest(new URL(redirect), request));

  try {
    const buildId = getBuildId(url);
    if (buildId) {
      response = await rewriteMeta(buildId, env, response);
    }
  } catch (err) {
    console.error(err);
  }
  response = new Response(response.body, response);
  response.headers.set("Cache-Control", "max-age=1500");
  return response;
};

export const handleApi = async ({ url, request, env }: HandlerParams): Promise<Response> => {
  const redirect = new URL(url.toString().replace(new RegExp(`^${url.origin}/api`), env.API_URL));
  return cachedFetch(cloneRequest(redirect, request, getExtraHeaders(env)));
};