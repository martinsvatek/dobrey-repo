import { ChatMessage } from './ChatMessage/ChatMessage';
import styles from './ChatMessages.module.scss';
import { ChatMessagesProps } from './ChatMessages.types';

export const ChatMessages = ({ chatHistory }: ChatMessagesProps): JSX.Element | null => (
	<div className={styles.chatMessages}>
		{chatHistory.map(({ text, type }, index) => (
			<ChatMessage key={index} text={text} type={type} />
		))}
	</div>
);
