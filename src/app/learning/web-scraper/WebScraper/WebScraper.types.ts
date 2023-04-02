import { ChangeEvent, FormEvent } from 'react';

export interface WebScraper {
	downloads: number;
	onFormSubmitHandler: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	onInputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	packageName: string;
}
