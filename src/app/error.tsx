'use client';

import { Button } from 'components';
import { useEffect } from 'react';
import { AppErrorProps } from './error.types';

const AppError = ({ error, reset }: AppErrorProps): JSX.Element => {
	useEffect(() => {
		/**
		 * @NOTE: tady muzeme poslat error do nejakeho reportovaciho systemu
		 */
	}, [error]);

	return (
		<>
			<p>Something went wrong...</p>
			<Button onClick={reset}>Reset</Button>
		</>
	);
};

export default AppError;
