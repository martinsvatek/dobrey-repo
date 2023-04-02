'use client';

import { Button } from 'components';
import { useRef } from 'react';
import { useShortestPath } from './ShortestPath.hooks';
import styles from './ShortestPath.module.scss';
import { Grid } from './components';

export const ShortestPath = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const { clear, finishNode, interact, startNode, visualize } = useShortestPath(canvasRef);

	return (
		<div className={styles.shortestPath}>
			<Grid finishNode={finishNode} onMouseInteraction={interact} ref={canvasRef} startNode={startNode} />
			<div className={styles.controls}>
				<Button color="grey-800" disabled={!startNode || !finishNode} onClick={visualize}>
					Visualize
				</Button>
				<Button color="peach" onClick={clear}>
					Clear
				</Button>
			</div>
		</div>
	);
};
