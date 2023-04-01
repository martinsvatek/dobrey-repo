'use client';

import { useIsLoading } from 'store';
import styles from './Loading.module.scss';

export const Loading = (): JSX.Element | null => {
	const isLoading = useIsLoading();

	if (!isLoading) {
		return null;
	}

	return <div className={styles.loading} />;
};
