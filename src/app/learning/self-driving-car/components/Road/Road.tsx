import { ROAD_CANVAS } from '../../page.consts';
import styles from './Road.module.scss';
import { RoadProps } from './Road.types';

const { HEIGHT, WIDTH } = ROAD_CANVAS;

export const Road = ({ roadRef }: RoadProps): JSX.Element => (
	<canvas className={styles.road} height={HEIGHT} ref={roadRef} width={WIDTH} />
);
