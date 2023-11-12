export const cachedFetch = async (
  input: RequestInfo,
  init?: RequestInit<RequestInitCfProperties>
): Promise<Response> => {
  let response = await fetch(input, {
    ...(init ?? {}),
    cf: {
      cacheTtl: 36000,
      cacheEverything: true
    }
  });
  response = new Response(response.body, response);
  response.headers.set("Cache-Control", "max-age=36000");
  return response;
};
