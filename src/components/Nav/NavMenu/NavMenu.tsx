'use client';

import {
	ArrowDownOnSquareIcon,
	ArrowPathRoundedSquareIcon,
	Bars3Icon,
	CodeBracketIcon,
	StopCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid';
import { Button } from 'components/Button';
import { joinClassNames } from 'global/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavLink } from './NavLink';
import styles from './NavMenu.module.scss';

export const NavMenu = (): JSX.Element => {
	const pathname = usePathname();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isRemoved, setIsRemoved] = useState(true);

	/**
	 * @NOTE: zavirani menu pri prechodu na jinou path
	 */
	useEffect(() => {
		setIsRemoved(prevIsRemoved => !prevIsRemoved);

		setTimeout(toggleMenu, 1000);
	}, [pathname]);

	const toggleMenu = (): void => {
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
	};

	const onButtonClickHandler = (): void => {
		setIsRemoved(prevIsRemoved => !prevIsRemoved);

		if (isMenuOpen) {
			setTimeout(toggleMenu, 1000);
		} else {
			toggleMenu();
		}
	};

	return (
		<>
			<Button className={styles.button} color="peach" onClick={onButtonClickHandler}>
				{isRemoved ? <Bars3Icon className={styles.iconMenu} /> : <XMarkIcon className={styles.iconCross} />}
			</Button>
			{isMenuOpen && (
				<nav className={joinClassNames([styles.nav, isRemoved && styles.hideAnimation])}>
					<NavLink
						href="/learning/self-driving-car"
						icon={<StopCircleIcon className={styles.iconLink} />}
						title="Self driving car"
					/>
					<NavLink
						href="/learning/shortest-path"
						icon={<ArrowPathRoundedSquareIcon className={styles.iconLink} />}
						title="Shortest path"
					/>
					<NavLink
						href="/learning/web-scraper"
						icon={<ArrowDownOnSquareIcon className={styles.iconLink} />}
						title="Web scraper"
					/>
					<NavLink
						href="/learning/czech-robot"
						icon={<CodeBracketIcon className={styles.iconLink} />}
						title="Czech robot"
					/>
				</nav>
			)}
		</>
	);
};
