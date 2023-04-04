'use client';

import { Button } from 'components';
import { useCzechRobot } from './CzechRobot.hooks';
import { ChatLink } from './components';

export const CzechRobot = (): JSX.Element => {
	const { chats, onCreateButtonClickHandler } = useCzechRobot();

	return (
		<>
			<Button color="peach" onClick={onCreateButtonClickHandler} type="button">
				Create new chat
			</Button>
			{chats.map(({ createdAt, id, title }) => (
				<ChatLink createdAt={createdAt} id={id} key={id} title={title} />
			))}
		</>
	);
};
