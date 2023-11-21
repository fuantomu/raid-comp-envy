import type { PageLoad } from "./$types";
import { constructParameters } from "$lib/buildRouting";

export const load: PageLoad = ({ params }) => {
  return constructParameters(params);
};
