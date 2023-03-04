import { joinClassNames } from 'global/utils';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

export const Button = ({
	className,
	color = 'grey-200',
	disabled = false,
	children,
	onClick,
	type = 'button',
}: ButtonProps): JSX.Element => (
	<button
		className={joinClassNames([styles.button, styles[color], disabled && styles.disabled, className])}
		disabled={disabled}
		onClick={onClick}
		type={type}
	>
		{children}
	</button>
);
