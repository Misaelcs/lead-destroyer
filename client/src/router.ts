import {
	createRouter,
	createWebHistory,
	createMemoryHistory,
} from '@vue-router';

import { setupLayouts } from 'virtual:generated-layouts';
export let extendedRoutes: any = null;
export const router = createRouter({
	history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
	extendRoutes: routes => {
		extendedRoutes = routes;
		return setupLayouts(routes);
	},
});
