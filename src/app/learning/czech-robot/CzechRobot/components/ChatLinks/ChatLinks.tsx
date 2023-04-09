import { Timestamp } from 'firebase/firestore';
import { ChatLink } from './ChatLink';
import styles from './ChatLinks.module.scss';
import { ChatLinksProps } from './ChatLinks.types';

export const ChatLinks = ({ chats, onClick }: ChatLinksProps): JSX.Element => (
	<div className={styles.chatLinks}>
		{chats.map(({ createdAt, id, title }) => (
			<ChatLink createdAt={createdAt as Timestamp} id={id} key={id} onClick={() => onClick(id)} title={title} />
		))}
	</div>
);
