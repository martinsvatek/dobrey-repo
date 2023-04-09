import { Chat } from '../../CzechRobot.types';

export interface ChatLinksProps {
	chats: Chat[];
	onClick: (chatId: string) => Promise<void>;
}
