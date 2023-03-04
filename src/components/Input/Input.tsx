import { ForwardedRef, forwardRef, KeyboardEvent } from 'react';
import { UNWANTED_CHARACTERS } from './Input.consts';
import styles from './Input.module.scss';
import { InputProps } from './Input.types';

export const Input = forwardRef(
	(
		{
			autoComplete = 'off',
			disabled = false,
			max,
			min,
			name,
			onChange,
			placeholder,
			type = 'text',
			value,
		}: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => (
		<>
			<label className={styles.label} htmlFor={name}>
				{placeholder}
			</label>
			<input
				autoComplete={autoComplete}
				className={styles.input}
				disabled={disabled}
				id={name}
				max={max}
				min={min}
				name={name}
				onChange={onChange}
				onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => {
					type === 'number' && UNWANTED_CHARACTERS.includes(event.key) && event.preventDefault();
				}}
				placeholder={placeholder}
				ref={ref}
				type={type}
				value={value}
			/>
		</>
	),
);

Input.displayName = 'Input';
