import { FC } from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './Select.types';

export const Select: FC<SelectProps> = ({
	autoComplete = 'off',
	disabled = false,
	multiple = false,
	name,
	onChange,
	options,
	placeholder,
	value,
}) => (
	<>
		<label className={styles.label} htmlFor={name}>
			{placeholder}
		</label>
		<select
			autoComplete={autoComplete}
			className={styles.select}
			disabled={disabled}
			id={name}
			multiple={multiple}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			value={value}
		>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	</>
);
