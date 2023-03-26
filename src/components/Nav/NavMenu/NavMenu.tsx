'use client';

import {
	ArrowDownOnSquareIcon,
	ArrowPathRoundedSquareIcon,
	Bars3Icon,
	CodeBracketIcon,
	StopCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from 'components/Button';
import { isAdmin, joinClassNames } from 'global/utils';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';
import { NavLink } from './NavLink';
import { useNavMenu } from './NavMenu.hooks';
import styles from './NavMenu.module.scss';

export const NavMenu = (): JSX.Element => {
	const { data, status } = useSession();

	const navRef = useRef<HTMLElement>(null);

	const { isButtonDisabled, isMenuOpen, isRemoved, onButtonClickHandler, onLinkClickHandler } = useNavMenu(navRef);

	return (
		<>
			<Button
				className={styles.button}
				color="peach"
				disabled={isMenuOpen === isRemoved || isButtonDisabled}
				onClick={onButtonClickHandler}
			>
				{isRemoved ? <Bars3Icon className={styles.iconMenu} /> : <XMarkIcon className={styles.iconCross} />}
			</Button>
			{isMenuOpen && (
				<nav className={joinClassNames([styles.nav, isRemoved && styles.hideAnimation])} ref={navRef}>
					<p className={styles.status}>{status}</p>
					{data ? (
						<Button color="peach" onClick={() => signOut()} type="button">
							Signout
						</Button>
					) : (
						<Button color="peach" onClick={() => signIn('google')} type="button">
							Signin
						</Button>
					)}
					{isAdmin(data) && (
						<div className={styles.iconLinks}>
							<NavLink
								href="/learning/self-driving-car"
								icon={<StopCircleIcon className={styles.iconLink} />}
								onClick={onLinkClickHandler}
								title="Self driving car"
							/>
							<NavLink
								href="/learning/shortest-path"
								icon={<ArrowPathRoundedSquareIcon className={styles.iconLink} />}
								onClick={onLinkClickHandler}
								title="Shortest path"
							/>
							<NavLink
								href="/learning/web-scraper"
								icon={<ArrowDownOnSquareIcon className={styles.iconLink} />}
								onClick={onLinkClickHandler}
								title="Web scraper"
							/>
							<NavLink
								href="/learning/czech-robot"
								icon={<CodeBracketIcon className={styles.iconLink} />}
								onClick={onLinkClickHandler}
								title="Czech robot"
							/>
						</div>
					)}
				</nav>
			)}
		</>
	);
};
