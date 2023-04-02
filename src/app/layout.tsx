import { Footer, Header, Main } from 'components';
import { AlertProvider, AuthUserProvider, IsLoadingProvider } from 'store';
import './_global.scss';
import { MainLayoutProps } from './layout.types';

const MainLayout = async ({ children }: MainLayoutProps): Promise<JSX.Element> => (
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

export default MainLayout;
