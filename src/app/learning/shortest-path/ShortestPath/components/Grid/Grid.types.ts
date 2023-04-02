import { MouseEvent } from 'react';
import { Coordinate } from '../../ShortestPath.types';

export interface GridProps {
	onMouseInteraction: (event: MouseEvent<HTMLCanvasElement>) => void;
	finishNode?: Coordinate;
	startNode?: Coordinate;
}
