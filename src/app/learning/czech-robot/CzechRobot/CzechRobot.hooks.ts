'use client';

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
import { Chat, CzechRobot } from './CzechRobot.types';

export const useCzechRobot = (): CzechRobot => {
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
					return setIsLoading(false);
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

	const onCreateButtonClickHandler = async (): Promise<void> => {
		setIsLoading(true);

		try {
			const chatsRef = query(
				collection(firestore, 'czechRobot_chats'),
				where('czechRobotMessagesCount', '==', 0),
				where('userId', '==', authUser),
				orderBy('createdAt', 'desc'),
				limit(20),
			);
			const chatsSnap = await getDocs(chatsRef);
			if (!chatsSnap.empty) {
				router.push(`/learning/czech-robot/${chatsSnap.docs[0].id}`);
				return setIsLoading(false);
			}

			const currentServerTimestamp = serverTimestamp();
			const newChat = {
				createdAt: currentServerTimestamp,
				czechRobotMessagesCount: 0,
				updatedAt: currentServerTimestamp,
				userId: authUser,
				title: 'Empty',
			};
			const chatRef = await addDoc(collection(firestore, 'czechRobot_chats'), newChat);

			const userRef = doc(firestore, 'users', authUser);
			await updateDoc(userRef, {
				czechRobotChatsCount: increment(1),
				updatedAt: currentServerTimestamp,
			});

			router.push(`/learning/czech-robot/${chatRef.id}`);
		} catch ({ message }) {
			setAlert(message);
		}

		setIsLoading(false);
	};

	return { chats, onCreateButtonClickHandler };
};
