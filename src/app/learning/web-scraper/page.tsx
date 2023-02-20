'use client';

import { Button, Input } from 'components';
import { GET_DOWNLOADS_MESSAGE_SUCCESS } from 'pages/api/webScraper/getDownloads/getDownloads.consts';
import { GetDownloadsResponseData } from 'pages/api/webScraper/getDownloads/getDownloads.types';
import { ChangeEvent, FC, useState } from 'react';

const WebScraper: FC = () => {
	const [downloads, setDownloads] = useState(0);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [packageName, setPackageName] = useState('');

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setPackageName(event.currentTarget.value);
	};

	const onButtonClickHandler = async (): Promise<void> => {
		setLoading(true);

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

	return (
		<>
			<h1>Web scraper</h1>
			<Input name="packageName" onChange={onInputChangeHandler} placeholder="Package name" value={packageName} />
			<Button color="peach" disabled={!packageName} onClick={onButtonClickHandler}>
				{loading ? 'Loading...' : 'Get downloads count'}
			</Button>
			{!loading &&
				(message === GET_DOWNLOADS_MESSAGE_SUCCESS ? (
					<>
						<p>{message}</p>
						<p>
							This package has <strong>{downloads}</strong> downloads.
						</p>
					</>
				) : (
					<p>{message}</p>
				))}
		</>
	);
};

export default WebScraper;
