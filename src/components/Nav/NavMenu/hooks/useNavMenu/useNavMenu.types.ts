export interface UseNavMenu {
	isButtonDisabled: boolean;
	isMenuOpen: boolean;
	isRemoved: boolean;
	onButtonClickHandler: () => void;
	onLinkClickHandler: () => void;
}
