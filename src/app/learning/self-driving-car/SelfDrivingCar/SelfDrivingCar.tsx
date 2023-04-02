'use client';

import { Button } from 'components';
import { removeLocalStorage, setLocalStorage } from 'global/utils';
import { useRef } from 'react';
import { useSetAlert } from 'store';
import { CAR } from './SelfDrivingCar.consts';
import { useSelfDrivingCar } from './SelfDrivingCar.hooks';
import styles from './SelfDrivingCar.module.scss';
import { Road, Visualizer } from './components';

export const SelfDrivingCar = (): JSX.Element => {
	const roadRef = useRef<HTMLCanvasElement>(null);
	const visualizerRef = useRef<HTMLCanvasElement>(null);

	const setAlert = useSetAlert();

	const { bestCar } = useSelfDrivingCar(roadRef, visualizerRef);

	const onSaveButtonClickHandler = (): void => {
		setLocalStorage('bestNeuralNetwork', bestCar.getLevels());

		setAlert('Neural network of this car was saved.');
	};

	const onSetButtonClickHandler = (): void => {
		const { BEST } = CAR;

		setLocalStorage('bestNeuralNetwork', BEST);

		setAlert('Neural network of the best car (locally saved) was set.');
	};

	const onClearButtonClickHandler = (): void => {
		removeLocalStorage('bestNeuralNetwork');

		setAlert('Neural network was clear and set to random values.');
	};

	return (
		<div className={styles.selfDrivingCar}>
			<div className={styles.canvases}>
				<Road ref={roadRef} />
				<Visualizer ref={visualizerRef} />
			</div>
			<div className={styles.controls}>
				<Button onClick={(): void => window.location.reload()}>Reload</Button>
				<Button color="grey-800" onClick={onSaveButtonClickHandler}>
					Save
				</Button>
				<Button color="grey-800" onClick={onSetButtonClickHandler}>
					Set best saved
				</Button>
				<Button color="peach" onClick={onClearButtonClickHandler}>
					Clear
				</Button>
			</div>
		</div>
	);
};
