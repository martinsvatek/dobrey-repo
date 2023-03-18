'use client';

import { Alert, Button, Form, Input } from 'components';
import { GetDownloadsResponseData } from 'pages/api/webScraper/getDownloads/getDownloads.types';
import { ChangeEvent, FormEvent, useState } from 'react';

const WebScraper = (): JSX.Element => {
	const [downloads, setDownloads] = useState(0);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState('');
	const [packageName, setPackageName] = useState('');

	const onAlertClickHandler = (): void => {
		setAlert('');
	};

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setLoading(true);

		const res = await fetch(`/api/webScraper/getDownloads`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ packageName }),
		});
		const { downloads, alert } = (await res.json()) as GetDownloadsResponseData;

		setDownloads(downloads);
		setAlert(alert);
		setLoading(false);
	};

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setDownloads(0);
		setPackageName(event.currentTarget.value);
	};

	return (
		<>
			{alert && <Alert onClick={onAlertClickHandler} text={alert} />}
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
				{downloads > 0 && (
					<p>
						<strong>{packageName || 'Package'}</strong> has <strong>{downloads}</strong> downloads.
					</p>
				)}
			</>
		</>
	);
};

export default WebScraper;
