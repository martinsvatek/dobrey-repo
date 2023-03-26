'use client';

import { Button } from 'components';
import { useEffect } from 'react';
import { HomeErrorProps } from './error.types';

const HomeError = ({ error, reset }: HomeErrorProps): JSX.Element => {
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

export default HomeError;
