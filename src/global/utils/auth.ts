import { ADMINS_LIST } from 'global/consts';
import decodeJwt from 'jwt-decode';

export const isAdmin = (email: string): boolean => ADMINS_LIST.includes(email);
export const isAdminServer = (token?: string): boolean =>
	!!token && ADMINS_LIST.includes(decodeJwt<{ email?: string }>(token).email || '');

export const isAuth = (email: string): boolean => !!email;
export const isAuthServer = (token?: string): boolean => !!token && !!decodeJwt<{ email?: string }>(token).email;
