'use client';

import { Button } from 'components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from 'global/config';
import { useRouter } from 'next/navigation';
import { useAuthUser, useSetAlert, useSetIsLoading } from 'store';

export const CzechRobot = (): JSX.Element => {
	const router = useRouter();

	const authUser = useAuthUser();
	const setAlert = useSetAlert();
	const setIsLoading = useSetIsLoading();

	const onButtonClickHandler = async (): Promise<void> => {
		try {
			setIsLoading(true);

			const currentServerTimestamp = serverTimestamp();
			const newChat = {
				createdAt: currentServerTimestamp,
				updatedAt: currentServerTimestamp,
				userId: authUser,
				title: '',
			};
			const docRef = await addDoc(collection(firestore, 'czechRobot_chat'), newChat);

			setIsLoading(false);

			router.push(`/learning/czech-robot/${docRef.id}`);
		} catch (error) {
			setAlert(error.message);
			return setIsLoading(false);
		}
	};

	return (
		<Button color="peach" onClick={onButtonClickHandler} type="button">
			Create new chat
		</Button>
	);
};
