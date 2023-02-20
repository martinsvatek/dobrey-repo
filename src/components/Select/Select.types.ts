import { ChangeEvent } from 'react';

export interface SelectProps {
	name: string;
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
	placeholder: string;
	value: string;
	autoComplete?: 'on' | 'off';
	disabled?: boolean;
	multiple?: boolean;
}
