export interface Nav {
	isButtonDisabled: boolean;
	isMenuOpen: boolean;
	isRemoved: boolean;
	onButtonClickHandler: () => void;
	onLinkClickHandler: () => void;
}
