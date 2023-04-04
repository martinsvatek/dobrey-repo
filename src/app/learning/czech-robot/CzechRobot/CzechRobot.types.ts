import { Timestamp } from 'firebase/firestore';

export interface Chat {
	createdAt: Timestamp;
	czechRobotMessagesCount: number;
	id: string;
	title: string;
	updatedAt: Timestamp;
	userId: string;
}

export interface CzechRobot {
	chats: Chat[];
	onCreateButtonClickHandler: () => Promise<void>;
}
