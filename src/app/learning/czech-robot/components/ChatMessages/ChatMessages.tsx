import { FC } from 'react';
import styles from './ChatMessages.module.scss';
import { ChatMessagesProps } from './ChatMessages.types';

export const ChatMessages: FC<ChatMessagesProps> = ({ chatHistory }) => {
	if (!chatHistory.length) {
		return null;
	}

	return (
		<div className={styles.chatMessages}>
			{chatHistory.map((chatMessage, index) => (
				<div key={index}>
					<h3>{chatMessage.type}</h3>
					<p>{chatMessage.text}</p>
				</div>
			))}
		</div>
	);
};
