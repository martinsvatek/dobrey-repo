import Link from 'next/link';
import styles from './NavLink.module.scss';
import { NavLinkProps } from './NavLink.types';

export const NavLink = ({ href, icon, onClick, title }: NavLinkProps): JSX.Element => (
	<Link className={styles.navLink} href={href} onClick={onClick}>
		{icon}
		<span className={styles.title}>{title}</span>
	</Link>
);
