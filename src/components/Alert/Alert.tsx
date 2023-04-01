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
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const onClickHandler = (): void => {
		setIsButtonDisabled(true);
		setIsRemoved(true);

		setTimeout(() => {
			setAlert('');
		}, 1000);
	};

	if (!alert) {
		return null;
	}

	return (
		<div className={joinClassNames([styles.alert, isRemoved && styles.hideAnimation])}>
			<p className={styles.text}>{alert}</p>
			<Button className={styles.button} color="peach" disabled={isButtonDisabled} onClick={onClickHandler}>
				<XMarkIcon className={styles.icon} />
			</Button>
		</div>
	);
};
