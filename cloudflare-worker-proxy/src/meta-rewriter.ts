import { BuildMeta, Env } from "./types";
import { getExtraHeaders } from "./utils";
import { makeRewriter } from "./html-rewriter";
import { cachedFetch } from "./cache";

export const rewriteMeta = async (buildId: string, env: Env, response: Response) => {
  const metaResponse = await cachedFetch(`${env.API_URL}/builds/${buildId}/meta`, {
    headers: getExtraHeaders(env),
    method: "GET"
  });
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