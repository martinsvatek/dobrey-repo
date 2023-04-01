'use client';

import { Alert, Button, Loading } from 'components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from 'global/config';
import { getUserEmail } from 'global/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Auth } from 'wrappers';

const CzechRobot = (): JSX.Element => {
	const router = useRouter();

	const [alert, setAlert] = useState('');
	const [loading, setIsLoading] = useState(false);

	const onAlertClickHandler = (): void => {
		setAlert('');
	};

	const onButtonClickHandler = async (): Promise<void> => {
		try {
			setIsLoading(true);

			const currentServerTimestamp = serverTimestamp();
			const newChat = {
				createdAt: currentServerTimestamp,
				updatedAt: currentServerTimestamp,
				userId: getUserEmail() || '',
				title: '',
			};
			const docRef = await addDoc(collection(firestore, 'czechRobot_chat'), newChat);

			setIsLoading(false);

			router.push(`/learning/czech-robot/${docRef.id}`);
		} catch (e) {
			setAlert('');
			return setIsLoading(false);
		}
	};

	return (
		<Auth>
			{alert && <Alert onClick={onAlertClickHandler} text={alert} />}
			{loading && <Loading />}
			<>
				<h1>Czech robot</h1>
				<Button color="peach" onClick={onButtonClickHandler} type="button">
					Create new chat
				</Button>
			</>
		</Auth>
	);
};

export default CzechRobot;
