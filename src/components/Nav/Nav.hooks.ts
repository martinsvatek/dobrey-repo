import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from 'global/config';
import { ALERT } from 'global/consts';
import { RefObject, useEffect, useState } from 'react';
import { useSetAlert, useSetAuthUser, useSetIsLoading } from 'store';
import { Nav } from './Nav.types';

const { SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNOUT_FAILURE, SIGNOUT_SUCCESS } = ALERT;

export const useNav = (navRef: RefObject<HTMLElement>): Nav => {
	const setAlert = useSetAlert();
	const setAuthUser = useSetAuthUser();
	const setIsLoading = useSetIsLoading();

	/**
	 * @NOTE: prevence proti splasenemu klikani
	 */
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	/**
	 * @NOTE: kvuli animaci pri odstraneni z domu
	 */
	const [isRemoved, setIsRemoved] = useState(true);

	useEffect(() => {
		const onClickOutsideHandler = (event: MouseEvent): void => {
			if (navRef.current?.contains(event.target as HTMLElement)) {
				return;
			}

			setIsRemoved(prevIsRemoved => !prevIsRemoved);
			setTimeout(() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen), 1000);
		};

		if (isMenuOpen && !isButtonDisabled) {
			document.addEventListener('click', onClickOutsideHandler);
		}

		return () => {
			document.removeEventListener('click', onClickOutsideHandler);
		};
	}, [isButtonDisabled, isMenuOpen, navRef]);

	/**
	 * @NOTE: pouze pro otevirani, zavirani handluje listener vyse
	 */
	const onMenuButtonClickHandler = (): void => {
		if (isMenuOpen) {
			return;
		}

		setIsButtonDisabled(true);
		setIsRemoved(prevIsRemoved => !prevIsRemoved);
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
		setTimeout(() => setIsButtonDisabled(false), 1000);
	};

	const onSignoutButtonClickHandler = (): void => {
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

	const onSigninButtonClickHandler = (): void => {
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

	const onLinkClickHandler = (): void => {
		setIsRemoved(prevIsRemoved => !prevIsRemoved);
		setTimeout(() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen), 1000);
	};

	return {
		isButtonDisabled,
		isMenuOpen,
		isRemoved,
		onLinkClickHandler,
		onMenuButtonClickHandler,
		onSigninButtonClickHandler,
		onSignoutButtonClickHandler,
	};
};
