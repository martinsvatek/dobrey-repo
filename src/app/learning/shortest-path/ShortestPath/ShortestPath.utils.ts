import { CANVAS, COLOR } from './ShortestPath.consts';
import { Coordinate, Node, NodeType } from './ShortestPath.types';

const { HEIGHT, WIDTH } = CANVAS;
const { GRID, PATH, SEARCH } = COLOR;

export const getCoordinates = (rowClickPosition: number, columnClickPosition: number): Coordinate => {
	let row = 0;
	const rowReminder = rowClickPosition % 10;

	if (rowClickPosition < 5) {
		row = 5;
	} else if (rowClickPosition > HEIGHT - 5) {
		row = HEIGHT - 5;
	} else if (rowReminder === 0) {
		row = rowClickPosition + 5;
	} else if (rowReminder === 5) {
		row = rowClickPosition;
	} else if (rowReminder < 5) {
		row = rowClickPosition - rowReminder + 5;
	} else {
		row = rowClickPosition - rowReminder + 5;
	}

	let column = 0;
	const columnReminder = columnClickPosition % 10;

	if (columnClickPosition < 5) {
		column = 5;
	} else if (columnClickPosition > WIDTH - 5) {
		column = WIDTH - 5;
	} else if (columnReminder === 0) {
		column = columnClickPosition + 5;
	} else if (columnReminder === 5) {
		column = columnClickPosition;
	} else if (columnReminder < 5) {
		column = columnClickPosition - columnReminder + 5;
	} else {
		column = columnClickPosition - columnReminder + 5;
	}

	return { row, column };
};

export const getShortestPathNodesInOrder = (finalNode: Node | null): Node[] => {
	const shortestPathNodesInOrder: Node[] = [];
	let currentNode = finalNode;

	while (currentNode !== null) {
		shortestPathNodesInOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}

	return shortestPathNodesInOrder;
};

export const getUpdatedGrid = (walls: Coordinate[], startNode?: Coordinate, finishNode?: Coordinate): Node[] => {
	const updatedGrid: Node[] = [];

	for (let row = 5; row < HEIGHT; row += 10) {
		for (let column = 5; column < WIDTH; column += 10) {
			const isFinishNode = finishNode !== undefined && row === finishNode.row && column === finishNode.column;
			const isStartNode = startNode !== undefined && row === startNode.row && column === startNode.column;
			const isWall = walls.some(wall => row === wall.row && column === wall.column);

			let type: NodeType = 'default';

			if (isFinishNode) {
				type = 'finish';
			} else if (isStartNode) {
				type = 'start';
			} else if (isWall) {
				type = 'wall';
			}

			updatedGrid.push({
				column,
				distance: isStartNode ? 0 : Infinity,
				isVisited: false,
				previousNode: null,
				row,
				type,
			});
		}
	}

	return updatedGrid;
};

export const drawGrid = (canvasContext: CanvasRenderingContext2D): void => {
	/**
	 * @NOTE: vse do vychoziho stavu
	 */
	canvasContext.beginPath();
	canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

	for (let i = 0; i <= WIDTH; i += 10) {
		canvasContext.moveTo(i, 0);
		canvasContext.lineTo(i, HEIGHT);
	}

	for (let i = 0; i <= HEIGHT; i += 10) {
		canvasContext.moveTo(0, i);
		canvasContext.lineTo(WIDTH, i);
	}

	canvasContext.strokeStyle = GRID;
	canvasContext.stroke();
};

export const drawNode = (canvasContext: CanvasRenderingContext2D, column: number, row: number, color: string): void => {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(column, row, 4, 0, 2 * Math.PI);
	canvasContext.fill();
};

export const drawShortestPath = async (
	canvasContext: CanvasRenderingContext2D,
	visitedGridInOrder: Node[],
	shortestPathInOrder: Node[],
): Promise<void> => {
	for (let i = 0; i < visitedGridInOrder.length; i++) {
		setTimeout(() => {
			const { column, row, type } = visitedGridInOrder[i];

			if (type === 'default') {
				canvasContext.fillStyle = SEARCH;
				canvasContext.beginPath();
				canvasContext.arc(column, row, 3, 0, 2 * Math.PI);
				canvasContext.fill();
			}
		}, i);
	}

	for (let i = 0; i < shortestPathInOrder.length; i++) {
		setTimeout(() => {
			const { column, row } = shortestPathInOrder[i];

			canvasContext.fillStyle = PATH;
			canvasContext.beginPath();
			canvasContext.arc(column, row, 4, 0, 2 * Math.PI);
			canvasContext.fill();
		}, 100 * i);
	}
};
