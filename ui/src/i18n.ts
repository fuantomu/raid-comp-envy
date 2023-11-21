import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import enCommon from './locales/en/common.json';
import enGame from './locales/en/game.json';

addMessages('en', enCommon);
addMessages('en', enGame);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator(),
});
