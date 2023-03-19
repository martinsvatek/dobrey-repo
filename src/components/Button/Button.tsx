import { joinClassNames } from 'global/utils';
import { ForwardedRef, forwardRef } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button = forwardRef(
	(
		{ className, color = 'grey-200', disabled = false, children, onClick, type = 'button' }: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	): JSX.Element => (
		<button
			className={joinClassNames([styles.button, styles[color], disabled && styles.disabled, className])}
			disabled={disabled}
			onClick={onClick}
			ref={ref}
			type={type}
		>
			{children}
		</button>
	),
);

Button.displayName = 'Button';
