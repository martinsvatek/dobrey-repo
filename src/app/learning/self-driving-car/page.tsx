'use client';

import { Alert, Button } from 'components';
import { removeLocalStorage, setLocalStorage } from 'global/utils';
import { useRef, useState } from 'react';
import { Auth } from 'wrappers';
import { Road, Visualizer } from './components';
import { CAR } from './page.consts';
import { useSelfDrivingCar } from './page.hooks';
import styles from './page.module.scss';

const SelfDrivingCar = (): JSX.Element => {
	const roadRef = useRef<HTMLCanvasElement>(null);
	const visualizerRef = useRef<HTMLCanvasElement>(null);

	const { bestCar } = useSelfDrivingCar(roadRef, visualizerRef);

	const [alert, setAlert] = useState('');

	const onAlertClickHandler = (): void => {
		setAlert('');
	};

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
		<Auth>
			{alert && <Alert onClick={onAlertClickHandler} text={alert} />}
			<>
				<h1>Self driving car</h1>
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
			</>
		</Auth>
	);
};

export default SelfDrivingCar;
