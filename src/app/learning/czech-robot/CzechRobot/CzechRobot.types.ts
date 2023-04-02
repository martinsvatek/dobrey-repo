import { FieldValue } from 'firebase/firestore';

export interface Chat {
	createdAt: FieldValue;
	updatedAt: FieldValue;
	userId: string;
	title: string;
}
