export interface Nav {
	isButtonDisabled: boolean;
	isMenuOpen: boolean;
	isRemoved: boolean;
	onLinkClickHandler: () => void;
	onMenuButtonClickHandler: () => void;
	onSigninButtonClickHandler: () => void;
	onSignoutButtonClickHandler: () => void;
}
