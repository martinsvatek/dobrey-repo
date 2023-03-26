import { ForwardedRef, forwardRef } from 'react';
import { ROAD_CANVAS } from '../../page.consts';
import styles from './Road.module.scss';

const { HEIGHT, WIDTH } = ROAD_CANVAS;

export const Road = forwardRef(
	(_, ref: ForwardedRef<HTMLCanvasElement>): JSX.Element => (
		<canvas className={styles.road} height={HEIGHT} ref={ref} width={WIDTH} />
	),
);

Road.displayName = 'Road';
