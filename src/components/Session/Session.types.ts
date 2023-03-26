import { Session } from 'next-auth';
import { ReactNode } from 'react';

export interface SessionProps {
	children: ReactNode;
	session: Session | null;
}
