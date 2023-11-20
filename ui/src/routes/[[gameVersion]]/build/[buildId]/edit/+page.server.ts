import type { PageServerLoad } from "./$types";
import { routeToCorrectBuildUrl } from "$lib/buildRouting";

export const load: PageServerLoad = ({ params }) => {
  return {
    streamed: {
      data: routeToCorrectBuildUrl(params, true)
    }
  };
};
