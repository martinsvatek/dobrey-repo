'use client';

import { SessionProvider } from 'next-auth/react';
import { SessionProps } from './Session.types';

export const Session = ({ children, session }: SessionProps): JSX.Element => (
	<SessionProvider session={session}>{children}</SessionProvider>
);
