import { ForwardedRef, forwardRef } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './Input.types';
import { preventUnwantedCharacters } from './Input.utils';

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
				onKeyDown={(event): void => preventUnwantedCharacters(event, type)}
				placeholder={placeholder}
				ref={ref}
				type={type}
				value={value}
			/>
		</>
	),
);

Input.displayName = 'Input';
