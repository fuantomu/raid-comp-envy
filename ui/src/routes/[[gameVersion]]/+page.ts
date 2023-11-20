import type { PageLoad } from "./$types";
import { constructCreateParameters } from "$lib/buildRouting";

export const load: PageLoad = ({ params }) => {
  try {
    return constructCreateParameters(params);
  } catch (err) {
    window.location.href = "/";
  }
};
