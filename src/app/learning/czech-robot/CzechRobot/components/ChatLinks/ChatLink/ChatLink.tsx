import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from 'components';
import Link from 'next/link';
import { useIsLoading } from 'store';
import styles from './ChatLink.module.scss';
import { ChatLinkProps } from './ChatLink.types';

export const ChatLink = ({ createdAt, id, onClick, title }: ChatLinkProps): JSX.Element => {
	const isLoading = useIsLoading();

	return (
		<div className={styles.chatLink}>
			<Link className={styles.link} href={`/learning/czech-robot/${id}`}>
				<p className={styles.createdAt}>{createdAt.toDate().toLocaleString()}</p>
				<p className={styles.title}>{title}</p>
			</Link>
			<Button className={styles.button} color="peach" disabled={isLoading} onClick={onClick}>
				<TrashIcon className={styles.icon} />
			</Button>
		</div>
	);
};
