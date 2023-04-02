import { ReactNode } from 'react';

export type Role = 'admin' | 'user';

export interface AuthProps {
	children: ReactNode;
	role?: Role;
}
