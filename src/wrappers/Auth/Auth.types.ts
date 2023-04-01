import { ReactNode } from 'react';

export interface AuthProps {
	children: ReactNode;
	role?: 'admin' | 'user';
}
