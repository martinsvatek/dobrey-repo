'use client';

import { Button, Form, Input } from 'components';
import { useWebScraper } from './WebScraper.hooks';

export const WebScraper = (): JSX.Element => {
	const { downloads, onFormSubmitHandler, onInputChangeHandler, packageName } = useWebScraper();

	return (
		<>
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
	);
};
