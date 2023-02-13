'use client';

import { Button, Form, Input } from 'components';
import { joinClassNames } from 'global/utils';
import { MESSAGE_FAIL, MESSAGE_SUCCESS } from 'pages/api/czechRobot/czechRobot.consts';
import { ResponseData } from 'pages/api/czechRobot/czechRobot.types';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styles from './page.module.scss';
import { ChatHistory } from './page.types';

const CzechRobot: FC = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [question, setQuestion] = useState('');
	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setQuestion(event.currentTarget.value);
	};

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setLoading(true);

		const updatedChatHistory: ChatHistory[] = [...chatHistory, { type: 'user', text: question }];
		const res = await fetch('http://localhost:3000/api/czechRobot/getAnswer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				question: updatedChatHistory.map(chatMessage => `${chatMessage.type}: ${chatMessage.text}`).join('\n'),
			}),
		});
		const { answer, message } = (await res.json()) as ResponseData;

		setChatHistory([...updatedChatHistory, { type: 'bot', text: answer }]);
		setMessage(message);
		setLoading(false);

		if (message === MESSAGE_SUCCESS) {
			setQuestion('');
		}
	};

	return (
		<>
			<h1>Czech robot</h1>
			<p
				className={joinClassNames([message === MESSAGE_FAIL && styles.messageFail])}
				key={chatHistory.toString()}
			>
				{message}
			</p>
			<Form onSubmit={onFormSubmitHandler}>
				<Input name="question" onChange={onInputChangeHandler} placeholder="Question" value={question} />
				<Button color="peach" isDisabled={!question} type="submit">
					{loading ? 'Loading...' : 'Get answer'}
				</Button>
			</Form>
		</>
	);
};

export default CzechRobot;
