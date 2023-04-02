import { Button } from 'components';
import { isAuth } from 'global/utils';
import { useAuthUser } from 'store';
import { useAuthButtons } from './AuthButtons.hooks';

export const AuthButtons = (): JSX.Element => {
	const authUser = useAuthUser();

	const { onSigninButtonClickHandler, onSignoutButtonClickHandler } = useAuthButtons();

	return (
		<>
			{isAuth(authUser) ? (
				<Button color="peach" onClick={onSignoutButtonClickHandler} type="button">
					Signout
				</Button>
			) : (
				<Button color="peach" onClick={onSigninButtonClickHandler} type="button">
					Signin
				</Button>
			)}
		</>
	);
};
