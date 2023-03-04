'use client';

import { Button, Form, Input } from 'components';
import { Alert } from 'components/Alert';
import { GetDownloadsResponseData } from 'pages/api/webScraper/getDownloads/getDownloads.types';
import { ChangeEvent, FormEvent, useState } from 'react';

const WebScraper = (): JSX.Element => {
	const [downloads, setDownloads] = useState(0);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [packageName, setPackageName] = useState('');

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setLoading(true);
		setMessage('');
		setDownloads(0);

		const res = await fetch('http://localhost:3000/api/webScraper/getDownloads', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ packageName }),
		});
		const { downloads, message } = (await res.json()) as GetDownloadsResponseData;

		setDownloads(downloads);
		setMessage(message);
		setLoading(false);
	};

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPackageName(event.currentTarget.value);
	};

	const onAlertClickHandler = (): void => {
		setMessage('');
	};

	return (
		<>
			{message && <Alert onClick={onAlertClickHandler} text={message} />}
			<>
				<h1>Web scraper</h1>
				<Form onSubmit={onFormSubmitHandler}>
					<Input
						name="packageName"
						onChange={onInputChangeHandler}
						placeholder="Package name"
						value={packageName}
					/>
					<Button color="peach" disabled={!packageName} type="submit">
						{loading ? 'Loading...' : 'Get downloads count'}
					</Button>
				</Form>
				{downloads && (
					<p>
						<strong>{packageName || 'Package'}</strong> has <strong>{downloads}</strong> downloads.
					</p>
				)}
			</>
		</>
	);
};

export default WebScraper;
