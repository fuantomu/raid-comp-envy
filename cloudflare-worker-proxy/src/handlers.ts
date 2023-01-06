import { makeRewriter } from "./html-rewriter";
import { BuildMeta, Env, HandlerParams } from "./types";

const cloneRequest = (url: URL, request: Request) => {
  return new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    cf: request.cf,
    fetcher: request.fetcher,
    redirect: request.redirect,
    signal: request.signal,
  });
};

const getBuildId = (url: URL): string => {
  const { build } = url.pathname.match(/\/build\/(?:g\/)?(?<build>\w+)/)?.groups ?? {};
  return build;
};

export const handleApi = async ({ url, request, env }: HandlerParams): Promise<Response> => {
  const redirect = new URL(url.toString().replace(new RegExp(`^${url.origin}/api`), env.API_URL));
  // redirect.searchParams.append("key", env.API_KEY);
  return fetch(cloneRequest(redirect, request));
};

const rewriteMeta = async (buildId: string, env: Env, response: Response) => {
  const metaResponse = await fetch(`${env.API_URL}/build/${buildId}/meta`);
  let rewriter: HTMLRewriter;
  if (metaResponse.ok) {
    const meta = (await metaResponse.json()) as BuildMeta;
    rewriter = makeRewriter(
      `${meta.name}`,
      `Raid Composition Tool\n${meta.total} players: ${meta.tanks} Tanks, ` +
        `${meta.healers} Healers, ${meta.dps} DPS` +
        (meta.unknown ? `, ${meta.unknown} Unknown` : "")
    );
  } else {
    rewriter = makeRewriter("Build not found");
  }
  return rewriter.transform(response);
};

export const handleFrontend = async ({ url, request, env }: HandlerParams): Promise<Response> => {
  const redirect = url.toString().replace(new RegExp(`^${url.origin}`), env.FRONTEND_URL);
  const response = await fetch(cloneRequest(new URL(redirect), request));

  const buildId = getBuildId(url);
  if (buildId) {
    return rewriteMeta(buildId, env, response);
  }
  return response;
};
