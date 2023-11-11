import { ViteSetupModule } from '@/types/ViteSetupModule';
import { createPinia } from 'pinia';

export const install: ViteSetupModule = ({ isClient, initialState, app }) => {
	const pinia = createPinia();
	app.use(pinia);
	
	if (isClient) pinia.state.value = initialState.pinia || {};
	else initialState.pinia = pinia.state.value;
};
