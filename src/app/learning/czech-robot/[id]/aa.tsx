// 'use client';

// import { Alert, Button, Form, Input, Loading, Select } from 'components';
// import { ALERT } from 'global/consts';
// import { isAdmin } from 'global/utils';
// import { useSession } from 'next-auth/react';
// import { GetAnswerResponseData } from 'pages/api/czechRobot/getAnswer/getAnswer.types';
// import { GetModelsListResponseData } from 'pages/api/czechRobot/getModelsList/getModelsList.types';
// import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { ChatMessages } from './components';
// import { ChatHistory } from './page.types';

// const { ACTION_SUCCESS, NO_ACCESS } = ALERT;

// const CzechRobot = (): JSX.Element => {
// 	const { data } = useSession();

// 	const [alert, setAlert] = useState('');
// 	const [currentEngine, setCurrentEngine] = useState('text-davinci-003');
// 	const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
// 	const [loading, setIsLoading] = useState(false);
// 	const [modelsList, setModelsList] = useState<string[]>([]);
// 	const [question, setPrompt] = useState('');

// 	useEffect(() => {
// 		chatHistory.length && window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
// 	}, [chatHistory]);

// 	useEffect(() => {
// 		const getModelsList = async (): Promise<void> => {
// 			setIsLoading(true);

// 			const res = await fetch('/api/czechRobot/getModelsList');
// 			const { modelsList, alert } = (await res.json()) as GetModelsListResponseData;
// 			setModelsList(modelsList);

// 			setAlert(alert);
// 			setIsLoading(false);
// 		};

// 		getModelsList();
// 	}, []);

// 	const onAlertClickHandler = (): void => {
// 		setAlert('');
// 	};

// 	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
// 		event.preventDefault();

// 		setIsLoading(true);

// 		const updatedChatHistory: ChatHistory[] = [...chatHistory, { type: 'question', text: question }];
// 		const res = await fetch('/api/czechRobot/getAnswer', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				model: currentEngine,
// 				prompt: `${updatedChatHistory
// 					.map(chatAlert => `${chatAlert.type}: ${chatAlert.text}`)
// 					.join('\n')}\nanswer: `,
// 			}),
// 		});
// 		const { answer, alert } = (await res.json()) as GetAnswerResponseData;

// 		setChatHistory([...updatedChatHistory, { type: 'answer', text: answer }]);
// 		setAlert(alert);
// 		setIsLoading(false);

// 		if (alert === ACTION_SUCCESS) {
// 			setPrompt('');
// 		}
// 	};

// 	const onSelectChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
// 		setCurrentEngine(event.currentTarget.value);
// 	};

// 	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
// 		setPrompt(event.currentTarget.value);
// 	};

// 	if (!isAdmin(data)) {
// 		return (
// 			<>
// 				<h1>Web scraper</h1>
// 				<p>{NO_ACCESS}</p>
// 			</>
// 		);
// 	}

// 	return (
// 		<>
// 			{alert && <Alert onClick={onAlertClickHandler} text={alert} />}
// 			{loading && <Loading />}
// 			<>
// 				<h1>Czech robot</h1>
// 				<Form onSubmit={onFormSubmitHandler}>
// 					{chatHistory.length > 0 && <ChatMessages chatHistory={chatHistory} />}
// 					<Select
// 						name="models"
// 						onChange={onSelectChangeHandler}
// 						options={modelsList}
// 						placeholder="Select engine"
// 						value={currentEngine}
// 					/>
// 					<Input name="question" onChange={onInputChangeHandler} placeholder="Question" value={question} />
// 					<Button color="peach" disabled={!question} type="submit">
// 						Get answer
// 					</Button>
// 				</Form>
// 			</>
// 		</>
// 	);
// };

// export default CzechRobot;
