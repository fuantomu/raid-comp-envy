// place files you want to import through the `$lib` alias in this folder.
import { dev } from '$app/environment';
import { PUBLIC_MOCKS_ENABLED } from '$env/static/public';

export const isMockEnabled = () => dev && PUBLIC_MOCKS_ENABLED === 'true';
