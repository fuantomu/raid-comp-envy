import { makeRewriter } from "./html-rewriter";
import { BuildMeta, Env, HandlerParams } from "./types";

const cloneRequest = (url: URL, request: Request, extraHeaders: Record<string, string> = {}) => {
  const headers = new Headers(request.headers);
  Object.entries((extraHeaders)).forEach(([k, v]) => headers.set(k, v));
  return new Request(url, {
    method: request.method,
    headers,
    body: request.body,
    cf: request.cf,
    fetcher: request.fetcher,
    redirect: request.redirect,
    signal: request.signal
  });
};

const getExtraHeaders = (env: Env): Record<string, string> => {
  const extraHeaders = {};
  for (const header of (env.EXTRA_HEADERS || "").split(";")) {
    const parts = header.split(":");
    extraHeaders[parts[0]] = parts[1];
  }
  return extraHeaders;
};

const getBuildId = (url: URL): string => {
  const { build } = url.pathname.match(/\/build\/(?:g\/)?(?<build>\w+)/)?.groups ?? {};
  return build;
};

export const handleApi = async ({ url, request, env }: HandlerParams): Promise<Response> => {
  const redirect = new URL(url.toString().replace(new RegExp(`^${url.origin}/api`), env.API_URL));
  return fetch(cloneRequest(redirect, request, getExtraHeaders(env)));
};

const rewriteMeta = async (buildId: string, env: Env, response: Response) => {
  const metaResponse = await fetch(`${env.API_URL}/builds/${buildId}/meta`, { headers: getExtraHeaders(env) });
  let rewriter: HTMLRewriter;
  if (metaResponse.ok) {
    const meta = (await metaResponse.json()) as BuildMeta;
    rewriter = makeRewriter(
      `${meta.name}`,
      `RaidComp: A raid composition tool for World of Warcraft\n${meta.total} players: ${meta.tanks} Tanks, ` +
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
  let response = await fetch(cloneRequest(new URL(redirect), request), {
    cf: {
      cacheTtl: 5,
      cacheEverything: true
    }
  });

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
