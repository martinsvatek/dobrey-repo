'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button';
import { joinClassNames } from 'global/utils';
import { useState } from 'react';
import { useAlert, useSetAlert } from 'store';
import styles from './Alert.module.scss';

export const Alert = (): JSX.Element | null => {
	const alert = useAlert();
	const setAlert = useSetAlert();

	const [isRemoved, setIsRemoved] = useState(false);

	const onButtonClickHandler = (): void => {
		setIsRemoved(true);

		setTimeout(() => {
			setAlert('');
			setIsRemoved(false);
		}, 1000);
	};

	if (!alert) {
		return null;
	}

	return (
		<div className={joinClassNames([styles.alert, isRemoved && styles.hideAnimation])} key={alert}>
			<p className={styles.text}>{alert}</p>
			<Button className={styles.button} color="peach" disabled={isRemoved} onClick={onButtonClickHandler}>
				<XMarkIcon className={styles.icon} />
			</Button>
		</div>
	);
};
