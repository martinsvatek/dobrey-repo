type Type = 'user' | 'bot';

export interface ChatHistory {
	type: Type;
	text: string;
}
