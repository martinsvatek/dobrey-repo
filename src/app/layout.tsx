import { Footer, Header, Main } from 'components';
import { AlertProvider, AuthUserProvider, IsLoadingProvider } from 'store';
import './_global.scss';
import { HomeLayoutProps } from './layout.types';

const HomeLayout = async ({ children }: HomeLayoutProps): Promise<JSX.Element> => (
	<html lang="en">
		<head />
		<body>
			<AuthUserProvider>
				<AlertProvider>
					<IsLoadingProvider>
						<Header />
						<Main>{children}</Main>
						<Footer />
					</IsLoadingProvider>
				</AlertProvider>
			</AuthUserProvider>
		</body>
	</html>
);

export default HomeLayout;
