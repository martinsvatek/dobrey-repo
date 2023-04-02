'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from 'components';
import { joinClassNames } from 'global/utils';
import { useRef } from 'react';
import { AuthButtons } from './AuthButtons';
import { AuthStatus } from './AuthStatus';
import { useNav } from './Nav.hooks';
import styles from './Nav.module.scss';
import { NavLinks } from './NavLinks';

export const Nav = (): JSX.Element => {
	const navRef = useRef<HTMLElement>(null);

	const { isButtonDisabled, isMenuOpen, isRemoved, onLinkClickHandler, onMenuButtonClickHandler } = useNav(navRef);

	return (
		<>
			<Button
				className={styles.button}
				color="peach"
				disabled={isMenuOpen === isRemoved || isButtonDisabled}
				onClick={onMenuButtonClickHandler}
			>
				{isRemoved ? <Bars3Icon className={styles.iconMenu} /> : <XMarkIcon className={styles.iconCross} />}
			</Button>
			{isMenuOpen && (
				<nav className={joinClassNames([styles.nav, isRemoved && styles.hideAnimation])} ref={navRef}>
					<AuthStatus />
					<AuthButtons />
					<NavLinks onClick={onLinkClickHandler} />
				</nav>
			)}
		</>
	);
};
