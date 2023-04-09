'use client';

import { Button } from 'components';
import { useIsLoading } from 'store';
import { useCzechRobot } from './CzechRobot.hooks';
import { ChatLinks } from './components';

export const CzechRobot = (): JSX.Element => {
	const isLoading = useIsLoading();
	const { chats, onCreateButtonClickHandler, onRemoveButtonClickHandler } = useCzechRobot();

	return (
		<>
			<Button color="peach" disabled={isLoading} onClick={onCreateButtonClickHandler} type="button">
				Create new chat
			</Button>
			{chats.length > 0 && <ChatLinks chats={chats} onClick={onRemoveButtonClickHandler} />}
		</>
	);
};
