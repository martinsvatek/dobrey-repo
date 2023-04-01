import { RefObject, useEffect, useState } from 'react';
import { Nav } from './Nav.types';

export const useNav = (navRef: RefObject<HTMLElement>): Nav => {
	/**
	 * @NOTE: prevence proti splasenemu klikani
	 */
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	/**
	 * @NOTE: kvuli animaci pri odstraneni z domu
	 */
	const [isRemoved, setIsRemoved] = useState(true);

	useEffect(() => {
		const onClickOutsideHandler = (event: MouseEvent): void => {
			if (navRef.current?.contains(event.target as HTMLElement)) {
				return;
			}

			setIsRemoved(prevIsRemoved => !prevIsRemoved);
			setTimeout(() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen), 1000);
		};

		if (isMenuOpen && !isButtonDisabled) {
			document.addEventListener('click', onClickOutsideHandler);
		}

		return () => {
			document.removeEventListener('click', onClickOutsideHandler);
		};
	}, [isButtonDisabled, isMenuOpen, navRef]);

	/**
	 * @NOTE: pouze pro otevirani, zavirani handluje listener vyse
	 */
	const onButtonClickHandler = (): void => {
		if (isMenuOpen) {
			return;
		}

		setIsButtonDisabled(true);
		setIsRemoved(prevIsRemoved => !prevIsRemoved);
		setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
		setTimeout(() => setIsButtonDisabled(false), 1000);
	};

	const onLinkClickHandler = (): void => {
		setIsRemoved(prevIsRemoved => !prevIsRemoved);
		setTimeout(() => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen), 1000);
	};

	return { isButtonDisabled, isMenuOpen, isRemoved, onButtonClickHandler, onLinkClickHandler };
};
