export type Type = 'question' | 'answer';

export interface ChatHistory {
	type: Type;
	text: string;
}
