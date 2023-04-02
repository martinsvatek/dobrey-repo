import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from 'global/config';
import { ALERT } from 'global/consts';
import { useSetAlert, useSetAuthUser, useSetIsLoading } from 'store';
import { AuthButtons } from './AuthButtons.types';

const { SIGNIN_FAILURE, SIGNIN_SUCCESS, SIGNOUT_FAILURE, SIGNOUT_SUCCESS } = ALERT;

export const useAuthButtons = (): AuthButtons => {
	const setAlert = useSetAlert();
	const setAuthUser = useSetAuthUser();
	const setIsLoading = useSetIsLoading();

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

	return { onSigninButtonClickHandler, onSignoutButtonClickHandler };
};
