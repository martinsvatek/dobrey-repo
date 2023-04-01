'use client';

import {
	ArrowDownOnSquareIcon,
	ArrowPathRoundedSquareIcon,
	Bars3Icon,
	CodeBracketIcon,
	StopCircleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from 'components';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from 'global/config';
import { ALERT } from 'global/consts';
import { isAdmin, isAuth, joinClassNames } from 'global/utils';
import { useRef } from 'react';
import { useAuthUser, useSetAlert, useSetAuthUser, useSetIsLoading } from 'store';
import { useNav } from './Nav.hooks';
import styles from './Nav.module.scss';
import { NavLink } from './NavLink';

const { SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNOUT_FAILURE, SIGNOUT_SUCCESS } = ALERT;

export const Nav = (): JSX.Element => {
	const navRef = useRef<HTMLElement>(null);

	const authUser = useAuthUser();
	const setAlert = useSetAlert();
	const setAuthUser = useSetAuthUser();
	const setIsLoading = useSetIsLoading();

	const { isButtonDisabled, isMenuOpen, isRemoved, onButtonClickHandler, onLinkClickHandler } = useNav(navRef);

	const onSignoutClickHandler = (): void => {
		setIsLoading(true);

		signOut(auth)
			.then(() => {
				setAuthUser('');
				setAlert(SIGNOUT_SUCCESS);
			})
			.catch(() => {
				setAlert(SIGNOUT_FAILURE);
			});

		setIsLoading(false);
	};

	const onSigninClickHandler = (): void => {
		setIsLoading(true);

		signInWithPopup(auth, provider)
			.then(result => {
				setAuthUser(result.user.email || '');
				setAlert(SIGNIN_SUCCESS);
			})
			.catch(() => {
				setAlert(SIGNIN_FAILURE);
			});

		setIsLoading(false);
	};

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
					<p className={styles.status}>
						{isAuth(authUser) ? `Authenticated: ${authUser}` : 'Unauthenticated'}
					</p>
					{isAuth(authUser) ? (
						<Button color="peach" onClick={onSignoutClickHandler} type="button">
							Signout
						</Button>
					) : (
						<Button color="peach" onClick={onSigninClickHandler} type="button">
							Signin
						</Button>
					)}
					{isAdmin(authUser) && (
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
