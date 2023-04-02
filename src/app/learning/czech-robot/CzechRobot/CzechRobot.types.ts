import { Timestamp } from 'firebase/firestore';

export interface Chat {
	createdAt: Timestamp;
	id: string;
	title: string;
	updatedAt: Timestamp;
	userId: string;
}
