import { Alert, Loading, Nav } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export const Header = (): JSX.Element => (
	<header className={styles.header}>
		<Alert />
		<Loading />
		<Nav />
		<Link className={styles.link} href="/" aria-label="Dobrey">
			<Image alt="Dobrey Logo" height={24} src="/dobrey_logo_grey_100.svg" width={24} />
		</Link>
	</header>
);
