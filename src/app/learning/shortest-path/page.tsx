'use client';

import { Button } from 'components';
import { useRef } from 'react';
import styles from './Page.module.scss';
import { Grid } from './components';
import { useShortestPath } from './page.hooks';

const ShortestPath = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const { clear, finishNode, interact, startNode, visualize } = useShortestPath(canvasRef);

	return (
		<>
			<h1>Shortest path</h1>
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
		</>
	);
};

export default ShortestPath;
