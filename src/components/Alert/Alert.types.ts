import { MouseEvent } from 'react';

export interface AlertProps {
	text: string;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
