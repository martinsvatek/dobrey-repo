import { FC } from 'react';
import styles from './ChatMessage.module.scss';
import { ChatMessageProps } from './ChatMessage.types';

export const ChatMessage: FC<ChatMessageProps> = ({ text, type }) => (
	<div className={styles[type]}>
		<p className={styles.text}>{text}</p>
	</div>
);
