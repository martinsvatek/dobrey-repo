import { auth } from 'global/config';

export const DEFAULT_STATE = auth.currentUser?.email || null;
