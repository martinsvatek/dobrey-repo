import { ADMINS_LIST } from 'global/consts';
import { Session } from 'next-auth';

export const isAdmin = (data?: Session | null): boolean => {
	if (!data?.user?.email) {
		return false;
	}

	return ADMINS_LIST.includes(data.user?.email);
};
