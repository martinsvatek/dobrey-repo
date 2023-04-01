'use client';

import { Button, Form, Input } from 'components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSetAlert, useSetIsLoading } from 'store';
import { Auth } from 'wrappers';
import { getDownloads } from './page.utils';

const WebScraper = (): JSX.Element => {
	const setAlert = useSetAlert();
	const setIsLoading = useSetIsLoading();

	const [downloads, setDownloads] = useState(0);
	const [packageName, setPackageName] = useState('');

	const onFormSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setIsLoading(true);

		const { alert, downloads } = await getDownloads(packageName);

		setAlert(alert);
		setDownloads(downloads);

		setIsLoading(false);
	};

	const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		setDownloads(0);
		setPackageName(event.currentTarget.value);
	};

	return (
		<Auth role="admin">
			<h1>Web scraper</h1>
			<Form onSubmit={onFormSubmitHandler}>
				<Input
					name="packageName"
					onChange={onInputChangeHandler}
					placeholder="NPM package name"
					value={packageName}
				/>
				<Button color="peach" disabled={!packageName} type="submit">
					Get downloads count
				</Button>
			</Form>
			{downloads > 0 && (
				<p>
					<strong>{packageName || 'Package'}</strong> has <strong>{downloads}</strong> downloads.
				</p>
			)}
		</Auth>
	);
};

export default WebScraper;
