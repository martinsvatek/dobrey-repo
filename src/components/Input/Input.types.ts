import { ChangeEvent } from 'react';

export interface InputProps {
	name: string;
	placeholder: string;
	autoComplete?: 'on' | 'off';
	disabled?: boolean;
	max?: number;
	min?: number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	type?: 'text' | 'number' | 'password';
	value?: string;
}
