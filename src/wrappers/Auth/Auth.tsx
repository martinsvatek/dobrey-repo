'use client';

import { ALERT } from 'global/consts';
import { useAuth } from './Auth.hooks';
import { AuthProps } from './Auth.types';

const { NO_ACCESS } = ALERT;

export const Auth = ({ children, role = 'user' }: AuthProps): JSX.Element => {
	const isAuth = useAuth(role);

	return isAuth ? <>{children}</> : <p>{NO_ACCESS}</p>;
};
