import { Footer, Main, Nav } from 'components';
import { FC } from 'react';
import { AppLayoutProps } from './layout.types';
import './_global.scss';

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
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
