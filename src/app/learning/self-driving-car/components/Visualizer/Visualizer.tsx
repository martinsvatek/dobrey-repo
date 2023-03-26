import { ForwardedRef, forwardRef } from 'react';
import { VISUALIZER_CANVAS } from '../../page.consts';
import styles from './Visualizer.module.scss';

const { HEIGHT, WIDTH } = VISUALIZER_CANVAS;

export const Visualizer = forwardRef(
	(_, ref: ForwardedRef<HTMLCanvasElement>): JSX.Element => (
		<canvas className={styles.visualizer} height={HEIGHT} ref={ref} width={WIDTH} />
	),
);

Visualizer.displayName = 'Visualizer';
