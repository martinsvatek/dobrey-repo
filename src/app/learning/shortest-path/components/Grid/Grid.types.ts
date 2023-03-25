import { MouseEvent } from 'react';
import { Coordinate } from '../../page.types';

export interface GridProps {
	onMouseInteraction: (event: MouseEvent<HTMLCanvasElement>) => void;
	finishNode?: Coordinate;
	startNode?: Coordinate;
}
