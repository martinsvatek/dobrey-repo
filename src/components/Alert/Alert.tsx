'use client';

import { Button } from 'components/Button';
import { joinClassNames } from 'global/utils';
import { MouseEvent, useState } from 'react';
import styles from './Alert.module.scss';
import { AlertProps } from './Alert.types';

export const Alert = ({ onClick, text }: AlertProps): JSX.Element | null => {
	const [isRemoved, setIsRemoved] = useState(false);

	const onButtonClickHandler = (event: MouseEvent<HTMLButtonElement>): void => {
		setIsRemoved(true);

		setTimeout(() => {
			onClick?.(event);
		}, 1000);
	};

	return (
		<div className={joinClassNames([styles.alert, isRemoved && styles.hideAnimation])}>
			<p className={styles.text}>{text}</p>
			<Button className={styles.button} color="peach" onClick={onButtonClickHandler}>
				X
			</Button>
		</div>
	);
};
