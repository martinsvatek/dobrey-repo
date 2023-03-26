import { VISUALIZER_CANVAS } from '../../page.consts';
import styles from './Visualizer.module.scss';
import { VisualizerProps } from './Visualizer.types';

const { HEIGHT, WIDTH } = VISUALIZER_CANVAS;

export const Visualizer = ({ visualizerRef }: VisualizerProps): JSX.Element => (
	<canvas className={styles.visualizer} height={HEIGHT} ref={visualizerRef} width={WIDTH} />
);
