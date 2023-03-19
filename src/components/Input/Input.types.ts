import { ChangeEvent } from 'react';

export type InputType = 'text' | 'number' | 'password';

export interface InputProps {
	name: string;
	placeholder: string;
	autoComplete?: 'on' | 'off';
	disabled?: boolean;
	max?: number;
	min?: number;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	type?: InputType;
	value?: string;
}
