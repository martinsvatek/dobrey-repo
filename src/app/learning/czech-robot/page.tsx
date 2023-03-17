'use client';

import { Alert, Button, Form, Input, Select } from 'components';
import { GET_ANSWER_MESSAGE_SUCCESS } from 'pages/api/czechRobot/getAnswer/getAnswer.consts';
import { GetAnswerResponseData } from 'pages/api/czechRobot/getAnswer/getAnswer.types';
import { GetModelsListResponseData } from 'pages/api/czechRobot/getModelsList/getModelsList.types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ChatMessages } from './components';
import { ChatHistory } from './page.types';

const CzechRobot = (): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [question, setPrompt] = useState('');
	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
	const [currentEngine, setCurrentEngine] = useState('text-davinci-003');
	const [modelsList, setModelsList] = useState<string[]>([]);

	useEffect(() => {
		window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
	}, [chatHistory]);

	useEffect(() => {
		const getModelsList = async (): Promise<void> => {
			setLoading(true);

			const res = await fetch('/api/czechRobot/getModelsList');
			const { modelsList, message } = (await res.json()) as GetModelsListResponseData;
			setModelsList(modelsList);

			setMessage(message);
			setLoading(false);
		};

		getModelsList();
	}, []);

	const onAlertClickHandler = (): void => {
		setMessage('');
	};

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setLoading(true);

		const updatedChatHistory: ChatHistory[] = [...chatHistory, { type: 'question', text: question }];
		const res = await fetch('/api/czechRobot/getAnswer', {
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

	const onSelectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
		setCurrentEngine(event.currentTarget.value);
	};

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPrompt(event.currentTarget.value);
	};

	return (
		<>
			{message && <Alert onClick={onAlertClickHandler} text={message} />}
			<>
				<h1>Czech robot</h1>
				<Form onSubmit={onFormSubmitHandler}>
					{chatHistory.length > 0 && <ChatMessages chatHistory={chatHistory} />}
					<Select
						name="models"
						onChange={onSelectChangeHandler}
						options={modelsList}
						placeholder="Select engine"
						value={currentEngine}
					/>
					<Input name="question" onChange={onInputChangeHandler} placeholder="Question" value={question} />
					<Button color="peach" disabled={!question} type="submit">
						{loading ? 'Loading...' : 'Get answer'}
					</Button>
				</Form>
			</>
		</>
	);
};

export default CzechRobot;
