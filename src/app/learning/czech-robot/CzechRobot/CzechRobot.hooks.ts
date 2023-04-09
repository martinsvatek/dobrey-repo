'use client';

import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
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
import { ALERT } from 'global/consts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthUser, useSetAlert, useSetIsLoading } from 'store';
import { Chat, CzechRobot } from './CzechRobot.types';

const { CHATS_LIMIT, CHAT_NOT_EXISTS, CHAT_NOT_OWNER } = ALERT;

export const useCzechRobot = (): CzechRobot => {
	const router = useRouter();

	const authUser = useAuthUser();
	const setAlert = useSetAlert();
	const setIsLoading = useSetIsLoading();

	const [chats, setChats] = useState<Chat[]>([]);

	useEffect((): void => {
		const getChats = async (): Promise<void> => {
			setIsLoading(true);

			try {
				/**
				 * @NOTE: zisk vsech chatu, ktere patri uzivateli
				 */
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
			/**
			 * @NOTE: zisk chatu, ktery nema zadnou zpravu a pripadne nasverovani na tento chat misto vytvareni noveho
			 */
			const chatsRef = query(
				collection(firestore, 'czechRobot_chats'),
				where('czechRobotMessagesCount', '==', 0),
				where('userId', '==', authUser),
				orderBy('createdAt', 'desc'),
				limit(1),
			);
			const chatsSnap = await getDocs(chatsRef);
			if (!chatsSnap.empty) {
				router.push(`/learning/czech-robot/${chatsSnap.docs[0].id}`);
				return setIsLoading(false);
			}

			/**
			 * @NOTE: hlidani limitu chatu (20 chatu)
			 */
			const userRef = doc(firestore, 'users', authUser);
			const userSnap = await getDoc(userRef);
			if (userSnap.data()?.czechRobotChatsCount >= 20) {
				setAlert(CHATS_LIMIT);
				return setIsLoading(false);
			}

			/**
			 * @NOTE: vytvoreni noveho chatu
			 */
			const currentServerTimestamp = serverTimestamp() as Timestamp;
			const newChat: Omit<Chat, 'id'> = {
				createdAt: currentServerTimestamp,
				czechRobotMessagesCount: 0,
				title: 'Empty',
				updatedAt: currentServerTimestamp,
				userId: authUser,
			};
			const chatRef = await addDoc(collection(firestore, 'czechRobot_chats'), newChat);
			/**
			 * @NOTE: editace uzivatele
			 */
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

	const onRemoveButtonClickHandler = async (chatId: string): Promise<void> => {
		setIsLoading(true);

		try {
			/**
			 * @NOTE: kontrola, zdali jiz chat neni smazany
			 */
			const chatRef = doc(firestore, 'czechRobot_chats', chatId);
			const chatSnap = await getDoc(chatRef);
			if (!chatSnap.exists()) {
				setAlert(CHAT_NOT_EXISTS);
				return setIsLoading(false);
			}

			const { czechRobotMessagesCount, userId } = chatSnap.data();

			/**
			 * @NOTE: kontrola, zdali je chat mazan opravnenym uzivatelem
			 */
			if (userId !== authUser) {
				setAlert(CHAT_NOT_OWNER);
				return setIsLoading(false);
			}

			/**
			 * @NOTE: smazani vsech zprav chatu, pokud nejake jsou
			 */
			if (czechRobotMessagesCount > 0) {
				const messagesRef = query(collection(firestore, 'czechRobot_messages'), where('chatId', '==', chatId));
				const messagesSnap = await getDocs(messagesRef);
				if (!messagesSnap.empty) {
					messagesSnap.forEach(async doc => {
						await deleteDoc(doc.ref);
					});
				}
			}

			await deleteDoc(chatRef);

			/**
			 * @NOTE: editace uzivatele
			 */
			const userRef = doc(firestore, 'users', authUser);
			const currentServerTimestamp = serverTimestamp();
			await updateDoc(userRef, {
				czechRobotChatsCount: increment(-1),
				updatedAt: currentServerTimestamp,
			});

			setChats(prevChats => {
				const updatedChats = [...prevChats].filter(chat => chat.id !== chatId);
				return updatedChats;
			});
		} catch ({ message }) {
			setAlert(message);
		}

		setIsLoading(false);
	};

	return { chats, onCreateButtonClickHandler, onRemoveButtonClickHandler };
};
