'use client';

import { Button, Form, Input, Select } from 'components';
import { joinClassNames } from 'global/utils';
import { GET_ANSWER_MESSAGE_FAIL, GET_ANSWER_MESSAGE_SUCCESS } from 'pages/api/czechRobot/getAnswer/getAnswer.consts';
import { GetAnswerResponseData } from 'pages/api/czechRobot/getAnswer/getAnswer.types';
import { GetEnginesListResponseData } from 'pages/api/czechRobot/getEnginesList/getEnginesList.types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ChatMessages } from './components';
import styles from './page.module.scss';
import { ChatHistory } from './page.types';

const CzechRobot = (): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [question, setPrompt] = useState('');
	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
	const [currentEngine, setCurrentEngine] = useState('text-davinci-003');
	const [enginesList, setEnginesList] = useState<string[]>([]);

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
	}, [chatHistory]);

	useEffect(() => {
		const getEnginesList = async (): Promise<void> => {
			setMessage('');
			setLoading(true);

			const res = await fetch('http://localhost:3000/api/czechRobot/getEnginesList');
			const { enginesList, message } = (await res.json()) as GetEnginesListResponseData;
			setEnginesList(enginesList);

			setMessage(message);
			setLoading(false);
		};

		getEnginesList();
	}, []);

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPrompt(event.currentTarget.value);
	};

	const onSelectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
		setCurrentEngine(event.currentTarget.value);
	};

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setLoading(true);
		setMessage('');

		const updatedChatHistory: ChatHistory[] = [...chatHistory, { type: 'question', text: question }];
		const res = await fetch('http://localhost:3000/api/czechRobot/getAnswer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: currentEngine,
				prompt: `${updatedChatHistory
					.map(chatMessage => `${chatMessage.type}: ${chatMessage.text}`)
					.join('\n')}\nanswer: `,
			}),
		});
		const { answer, message } = (await res.json()) as GetAnswerResponseData;

		setChatHistory([...updatedChatHistory, { type: 'answer', text: answer }]);
		setMessage(message);
		setLoading(false);

		if (message === GET_ANSWER_MESSAGE_SUCCESS) {
			setPrompt('');
		}
	};

	return (
		<>
			<h1>Czech robot</h1>
			<Form onSubmit={onFormSubmitHandler}>
				{chatHistory.length > 0 && <ChatMessages chatHistory={chatHistory} />}
				<Select
					name="engines"
					onChange={onSelectChangeHandler}
					options={enginesList}
					placeholder="Select engine"
					value={currentEngine}
				/>
				<Input name="question" onChange={onInputChangeHandler} placeholder="Question" value={question} />
				<Button color="peach" disabled={!question} type="submit">
					{loading ? 'Loading...' : 'Get answer'}
				</Button>
				<p
					className={joinClassNames([message === GET_ANSWER_MESSAGE_FAIL && styles.messageFail])}
					key={chatHistory.toString()}
				>
					{message}
				</p>
			</Form>
		</>
	);
};

export default CzechRobot;
