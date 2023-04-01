'use client';

import { Alert, Button, Form, Input, Loading } from 'components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Auth } from 'wrappers';
import { getDownloads } from './page.utils';

const WebScraper = (): JSX.Element => {
	const [alert, setAlert] = useState('');
	const [downloads, setDownloads] = useState(0);
	const [loading, setIsLoading] = useState(false);
	const [packageName, setPackageName] = useState('');

	const onAlertClickHandler = (): void => {
		setAlert('');
	};

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
		<Auth>
			{alert && <Alert onClick={onAlertClickHandler} text={alert} />}
			{loading && <Loading />}
			<>
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
			</>
		</Auth>
	);
};

export default WebScraper;
