import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from 'components';
import Link from 'next/link';
import styles from './ChatLink.module.scss';
import { ChatLinkProps } from './ChatLink.types';

export const ChatLink = ({ createdAt, id, title }: ChatLinkProps): JSX.Element => (
	<Link className={styles.chatLink} href={`/learning/czech-robot/${id}`}>
		<div className={styles.info}>
			<p className={styles.createdAt}>{createdAt.toDate().toLocaleString()}</p>
			<p className={styles.title}>{title}</p>
		</div>
		<Button className={styles.button} color="peach">
			<TrashIcon className={styles.icon} />
		</Button>
	</Link>
);
