import Image from 'next/image';
import Link from 'next/link';
import styles from './Nav.module.scss';
import { NavMenu } from './NavMenu';

export const Nav = (): JSX.Element => (
	<nav className={styles.nav}>
		<Link className={styles.logo} href="/" aria-label="Dobrey">
			<Image alt="Dobrey Logo" height={24} src="/dobrey_logo_grey_100.svg" width={24} />
		</Link>
		<NavMenu />
	</nav>
);
