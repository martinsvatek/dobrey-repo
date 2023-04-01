import { auth } from 'global/config';
import { ADMINS_LIST } from 'global/consts';
import decodeJwt from 'jwt-decode';

export const getUserEmail = (): string | null | undefined => auth.currentUser?.email;

export const isAdmin = (): boolean => ADMINS_LIST.includes(auth.currentUser?.email || '');
export const isAdminServer = (token?: string): boolean =>
	!!token && ADMINS_LIST.includes(decodeJwt<{ email?: string }>(token).email || '');

export const isAuth = (): boolean => !!auth.currentUser;
export const isAuthServer = (token?: string): boolean => !!token && !!decodeJwt<{ email?: string }>(token).email;
