import { Timestamp } from 'firebase/firestore';
import { MouseEvent } from 'react';

export interface ChatLinkProps {
	createdAt: Timestamp;
	id: string;
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	title: string;
}
