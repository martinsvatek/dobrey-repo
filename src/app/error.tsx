'use client';

import { Button } from 'components';
import { FC, useEffect } from 'react';
import { AppErrorProps } from './error.types';

const AppError: FC<AppErrorProps> = ({ error, reset }) => {
	useEffect(() => {
		/**
		 * @NOTE: tady muzeme poslat error do nejakeho reportovaciho systemu
		 */
		console.error(error);
	}, [error]);

	return (
		<>
			<p>Something went wrong...</p>
			<Button onClick={(): void => reset()}>Reset</Button>
		</>
	);
};

export default AppError;
