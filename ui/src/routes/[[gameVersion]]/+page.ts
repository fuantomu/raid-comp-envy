import type { PageLoad } from './$types';
import { constructCreateParameters } from '$lib/buildRouting';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ params }) => {
	try {
		return constructCreateParameters(params);
	} catch (err) {
		await goto('/');
	}
};
