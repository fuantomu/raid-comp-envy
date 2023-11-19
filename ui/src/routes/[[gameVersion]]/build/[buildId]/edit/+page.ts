import type { PageLoad } from './$types';
import { routeToCorrectBuildUrl } from '$lib/buildRouting';

export const load: PageLoad = async ({ params }) => {
	return await routeToCorrectBuildUrl(params, true);
};
