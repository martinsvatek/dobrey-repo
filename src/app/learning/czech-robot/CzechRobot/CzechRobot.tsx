'use client';

import { Button } from 'components';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { firestore } from 'global/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthUser, useSetAlert, useSetIsLoading } from 'store';
import { Chat } from './CzechRobot.types';
import { ChatLink } from './components';

export const CzechRobot = (): JSX.Element => {
	const router = useRouter();

	const authUser = useAuthUser();
	const setAlert = useSetAlert();
	const setIsLoading = useSetIsLoading();

	const [chats, setChats] = useState<Chat[]>([]);

	useEffect((): void => {
		const getChats = async (): Promise<void> => {
			setIsLoading(true);
			/* get last 14 recipes */
			try {
				const chatsRef = query(
					collection(firestore, 'czechRobot_chats'),
					where('userId', '==', authUser),
					orderBy('createdAt', 'desc'),
					limit(20),
				);
				const chatsSnap = await getDocs(chatsRef);

				if (chatsSnap.empty) {
					return;
				}

				const chats: Chat[] = [];

				chatsSnap.forEach(doc => {
					const chat = doc.data() as Chat;
					chat.id = doc.id;

					chats.push(chat);
				});

				setChats(chats);
			} catch ({ message }) {
				setAlert(message);
			}

			setIsLoading(false);
		};

		getChats();
	}, [authUser, setAlert, setIsLoading]);

	const onButtonClickHandler = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const currentServerTimestamp = serverTimestamp();
			const newChat = {
				createdAt: currentServerTimestamp,
				updatedAt: currentServerTimestamp,
				userId: authUser,
				title: 'Empty',
			};
			const chatRef = await addDoc(collection(firestore, 'czechRobot_chats'), newChat);

			try {
				const userRef = doc(firestore, 'users', authUser);
				await updateDoc(userRef, {
					czechRobotChatsCount: increment(1),
				});

				router.push(`/learning/czech-robot/${chatRef.id}`);
			} catch ({ message }) {
				setAlert(message);
			}
		} catch ({ message }) {
			setAlert(message);
		}

		setIsLoading(false);
	};

	return (
		<>
			<Button color="peach" onClick={onButtonClickHandler} type="button">
				Create new chat
			</Button>
			{chats.map(({ createdAt, id, title }) => (
				<ChatLink createdAt={createdAt} id={id} key={id} title={title} />
			))}
		</>
	);
};
