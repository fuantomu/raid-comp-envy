import type { PageLoad } from './$types';
import { constructCreateParameters } from '$lib/buildRouting';

export const load: PageLoad = ({ params }) => {
	return constructCreateParameters(params);
};
