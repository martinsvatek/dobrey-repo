import styles from './ChatMessage.module.scss';
import { ChatMessageProps } from './ChatMessage.types';

export const ChatMessage = ({ text, type }: ChatMessageProps): JSX.Element => (
	<div className={styles[type]}>
		<p className={styles.text}>{text}</p>
	</div>
);
