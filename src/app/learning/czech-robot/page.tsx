'use client';

import { Button } from 'components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from 'global/config';
import { useRouter } from 'next/navigation';
import { useAuthUser, useSetAlert, useSetIsLoading } from 'store';
import { Auth } from 'wrappers';

const CzechRobot = (): JSX.Element => {
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
		} catch {
			setAlert('');
			return setIsLoading(false);
		}
	};

	return (
		<Auth role="admin">
			<h1>Czech robot</h1>
			<Button color="peach" onClick={onButtonClickHandler} type="button">
				Create new chat
			</Button>
		</Auth>
	);
};

export default CzechRobot;
