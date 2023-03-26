import { Footer, Main, Nav, Session } from 'components';
import { AUTH_OPTIONS } from 'global/consts';
import { getServerSession } from 'next-auth/next';
import './_global.scss';
import { HomeLayoutProps } from './layout.types';

const HomeLayout = async ({ children }: HomeLayoutProps): Promise<JSX.Element> => {
	/**
	 * @NOTE: sdileni session v cele aplikaci
	 */
	const session = await getServerSession(AUTH_OPTIONS);

	return (
		<html lang="en">
			<head />
			<body>
				<Session session={session}>
					<Nav />
					<Main>{children}</Main>
					<Footer />
				</Session>
			</body>
		</html>
	);
};

export default HomeLayout;
