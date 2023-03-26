'use client';

import { Button } from 'components';
import { ALERT } from 'global/consts';
import { isAdmin } from 'global/utils';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import styles from './Page.module.scss';
import { Grid } from './components';
import { useShortestPath } from './page.hooks';

const { NO_ACCESS } = ALERT;

const ShortestPath = (): JSX.Element => {
	const { data } = useSession();

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const { clear, finishNode, interact, startNode, visualize } = useShortestPath(canvasRef);

	if (!isAdmin(data)) {
		return (
			<>
				<h1>Web scraper</h1>
				<p>{NO_ACCESS}</p>
			</>
		);
	}

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
