'use-client';

import { ForwardedRef, forwardRef, useState } from 'react';
import { CANVAS } from '../../page.consts';
import styles from './Grid.module.scss';
import { GridProps } from './Grid.types';

const { HEIGHT, WIDTH } = CANVAS;

export const Grid = forwardRef(
	({ finishNode, onMouseInteraction, startNode }: GridProps, ref: ForwardedRef<HTMLCanvasElement>): JSX.Element => {
		const [allowDrawing, setAllowDrawing] = useState(false);

		return (
			<canvas
				className={styles.grid}
				height={HEIGHT}
				onClick={onMouseInteraction}
				onMouseDown={(): void => {
					finishNode && startNode && setAllowDrawing(true);
				}}
				onMouseLeave={(): void => setAllowDrawing(false)}
				onMouseMove={(event): void => {
					allowDrawing && onMouseInteraction(event);
				}}
				onMouseUp={(): void => setAllowDrawing(false)}
				ref={ref}
				width={WIDTH}
			/>
		);
	},
);

Grid.displayName = 'Grid';
