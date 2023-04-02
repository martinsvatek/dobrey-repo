import { MouseEvent } from 'react';

export interface NavLinkProps {
	href: string;
	icon: JSX.Element;
	onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
	title: string;
}
