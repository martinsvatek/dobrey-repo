import { joinClassNames } from 'global/utils';
import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = ({
	color = 'grey-200',
	disabled = false,
	children,
	onClick,
	type = 'button',
}) => (
	<button
		className={joinClassNames([styles.button, styles[color], disabled && styles.disabled])}
		disabled={disabled}
		onClick={onClick}
		type={type}
	>
		{children}
	</button>
);
