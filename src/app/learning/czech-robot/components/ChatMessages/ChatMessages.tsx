import { FC } from 'react';
import { ChatMessage } from './ChatMessage/ChatMessage';
import styles from './ChatMessages.module.scss';
import { ChatMessagesProps } from './ChatMessages.types';

export const ChatMessages: FC<ChatMessagesProps> = ({ chatHistory }) => {
	if (!chatHistory.length) {
		return null;
	}

	return (
		<div className={styles.chatMessages}>
			{chatHistory.map(({ text, type }, index) => (
				<ChatMessage key={index} text={text} type={type} />
			))}
		</div>
	);
};
