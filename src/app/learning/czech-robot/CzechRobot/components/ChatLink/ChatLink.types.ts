import { Timestamp } from 'firebase/firestore';

export interface ChatLinkProps {
	createdAt: Timestamp;
	id: string;
	title: string;
}
