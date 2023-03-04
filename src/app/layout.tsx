import { Footer, Main, Nav } from 'components';
import { AppLayoutProps } from './layout.types';
import './_global.scss';

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => (
	<html lang="en">
		<head />
		<body>
			<Nav />
			<Main>{children}</Main>
			<Footer />
		</body>
	</html>
);

export default AppLayout;
