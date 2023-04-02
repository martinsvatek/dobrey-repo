'use client';

import {
	ArrowDownOnSquareIcon,
	ArrowPathRoundedSquareIcon,
	CodeBracketIcon,
	FaceSmileIcon,
	StopCircleIcon,
} from '@heroicons/react/24/outline';
import { isAdmin } from 'global/utils';
import { useAuthUser } from 'store';
import { NavLink } from './NavLink';
import styles from './NavLinks.module.scss';
import { NavLinksProps } from './NavLinks.types';

export const NavLinks = ({ onClick }: NavLinksProps): JSX.Element => {
	const authUser = useAuthUser();

	return (
		<>
			{isAdmin(authUser) && (
				<div className={styles.adminLinks}>
					<NavLink
						href="/learning/self-driving-car"
						icon={<StopCircleIcon className={styles.icon} />}
						onClick={onClick}
						title="Self driving car"
					/>
					<NavLink
						href="/learning/shortest-path"
						icon={<ArrowPathRoundedSquareIcon className={styles.icon} />}
						onClick={onClick}
						title="Shortest path"
					/>
					<NavLink
						href="/learning/web-scraper"
						icon={<ArrowDownOnSquareIcon className={styles.icon} />}
						onClick={onClick}
						title="Web scraper"
					/>
					<NavLink
						href="/learning/czech-robot"
						icon={<CodeBracketIcon className={styles.icon} />}
						onClick={onClick}
						title="Czech robot"
					/>
				</div>
			)}
			<div className={styles.links}>
				<NavLink href="#" icon={<FaceSmileIcon className={styles.icon} />} onClick={onClick} title="Test" />
				<NavLink href="#" icon={<FaceSmileIcon className={styles.icon} />} onClick={onClick} title="Test" />
			</div>
		</>
	);
};
