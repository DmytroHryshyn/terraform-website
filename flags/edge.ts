import { createGetEdgeFlags } from '@happykit/flags/edge';
import { config } from './config';
export const getEdgeFlags = createGetEdgeFlags<AppFlags>(config);
