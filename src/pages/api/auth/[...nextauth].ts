import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	/**
	 * @NOTE: seznam vsech provideru
	 */
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_FIREBASE_AUTH_ID || '',
			clientSecret: process.env.GOOGLE_FIREBASE_AUTH_SECRET || '',
		}),
	],
};

export default NextAuth(authOptions);
