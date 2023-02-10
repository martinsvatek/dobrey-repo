import { joinClassNames } from 'global/utils';
import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = ({
	children,
	color = 'grey-200',
	isDisabled = false,
	onClick,
	type = 'button',
}) => (
	<button
		className={joinClassNames([styles.button, styles[color], isDisabled && styles.disabled])}
		disabled={isDisabled}
		onClick={onClick}
		type={type}
	>
		{children}
	</button>
);
