import { VISUALIZER_CANVAS_HEIGHT, VISUALIZER_CANVAS_WIDTH } from '../../page.consts';
import styles from './Visualizer.module.scss';
import { VisualizerProps } from './Visualizer.types';

export const Visualizer = ({ visualizerRef }: VisualizerProps): JSX.Element => (
	<canvas
		className={styles.visualizer}
		height={VISUALIZER_CANVAS_HEIGHT}
		ref={visualizerRef}
		width={VISUALIZER_CANVAS_WIDTH}
	/>
);
