export interface NavMenu {
	isButtonDisabled: boolean;
	isMenuOpen: boolean;
	isRemoved: boolean;
	onButtonClickHandler: () => void;
	onLinkClickHandler: () => void;
}
