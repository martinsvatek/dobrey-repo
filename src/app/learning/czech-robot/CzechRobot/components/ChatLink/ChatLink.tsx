import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from './ChatLink.module.scss';
import { ChatLinkProps } from './ChatLink.types';

export const ChatLink = ({ createdAt, id, title }: ChatLinkProps): JSX.Element => (
	<Link className={styles.chatLink} href={`/learning/czech-robot/${id}`}>
		<ChatBubbleLeftRightIcon className={styles.icon} />
		<p className={styles.createdAt}>{createdAt.toDate().toLocaleString()}</p>
		<p className={styles.title}>{title}</p>
	</Link>
);
