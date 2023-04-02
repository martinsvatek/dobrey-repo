'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useSetAlert, useSetIsLoading } from 'store';
import { WebScraper } from './WebScraper.types';
import { getDownloads } from './WebScraper.utils';

export const useWebScraper = (): WebScraper => {
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

	return { downloads, onFormSubmitHandler, onInputChangeHandler, packageName };
};
