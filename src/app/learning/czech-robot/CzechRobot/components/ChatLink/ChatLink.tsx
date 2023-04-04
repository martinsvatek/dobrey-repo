import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from './ChatLink.module.scss';
import { ChatLinkProps } from './ChatLink.types';

export const ChatLink = ({ createdAt, id, title }: ChatLinkProps): JSX.Element => (
	<Link className={styles.chatLink} href={`/learning/czech-robot/${id}`}>
		<div className={styles.icons}>
			<p className={styles.createdAt}>{createdAt.toDate().toLocaleString()}</p>
			<TrashIcon className={styles.icon} />
		</div>
		<p className={styles.title}>{title}</p>
	</Link>
);
