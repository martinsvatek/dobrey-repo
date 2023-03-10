import { MouseEvent } from 'react';

export interface ButtonProps {
	children: string;
	className?: string;
	color?: 'grey-200' | 'grey-800' | 'peach';
	disabled?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit';
}
