import { Env } from "./types";

export const cloneRequest = (url: URL, request: Request, extraHeaders: Record<string, string> = {}) => {
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

export const getExtraHeaders = (env: Env): Record<string, string> => {
  const extraHeaders = {};
  for (const header of (env.EXTRA_HEADERS || "").split(";")) {
    const parts = header.split(":");
    extraHeaders[parts[0]] = parts[1];
  }
  return extraHeaders;
};

export const getBuildId = (url: URL): string => {
  const { build } = url.pathname.match(/\/build\/(?:g\/)?(?<build>\w+)/)?.groups ?? {};
  return build;
};

