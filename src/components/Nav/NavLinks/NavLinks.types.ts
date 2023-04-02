import { MouseEvent } from 'react';

export interface NavLinksProps {
	onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}
