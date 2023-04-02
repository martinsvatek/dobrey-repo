'use client';

import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore, provider } from 'global/config';
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
			.catch(({ message }) => {
				setAlert(message);
			});

		setIsLoading(false);
	};

	const onSigninButtonClickHandler = (): void => {
		setIsLoading(true);

		signInWithPopup(auth, provider)
			.then(async result => {
				const userEmail = result.user.email;
				if (!userEmail) {
					return setAlert(SIGNIN_FAILURE);
				}

				try {
					const userRef = doc(firestore, 'users', userEmail);
					const userSnap = await getDoc(userRef);

					if (!userSnap.exists()) {
						try {
							const currentServerTimestamp = serverTimestamp();
							const newUser = {
								createdAt: currentServerTimestamp,
								updatedAt: currentServerTimestamp,
								czechRobotChatsCount: 0,
							};

							await setDoc(doc(firestore, 'users', userEmail), newUser);
						} catch ({ message }) {
							return setAlert(message);
						}
					}

					setAuthUser(userEmail);
					setAlert(SIGNIN_SUCCESS);
				} catch ({ message }) {
					setAlert(message);
				}
			})
			.catch(({ message }) => {
				setAlert(message);
			});

		setIsLoading(false);
	};

	return { onSigninButtonClickHandler, onSignoutButtonClickHandler };
};
