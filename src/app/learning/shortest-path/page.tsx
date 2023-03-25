'use client';

import { Button } from 'components';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import styles from './Page.module.scss';
import { Grid } from './components';
import { CANVAS, COLOR } from './page.consts';
import { Coordinate, Node } from './page.types';
import {
	drawGrid,
	drawNode,
	drawShortestPath,
	getCoordinates,
	getShortestPathNodesInOrder,
	getUpdatedGrid,
} from './page.utils';

const { HEIGHT, WIDTH } = CANVAS;
const { FINISH, START, WALL } = COLOR;

const ShortestPath = (): JSX.Element => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [finalNode, setFinalNode] = useState<Node>();
	const [finishNode, setFinishNode] = useState<Coordinate>();
	const [grid, setGrid] = useState<Node[]>([]);
	const [shortestPathInOrder, setShortestPathInOrder] = useState<Node[]>([]);
	const [startNode, setStartNode] = useState<Coordinate>();
	const [visitedGridInOrder, setVisitedGridInOrder] = useState<Node[]>([]);
	const [walls, setWalls] = useState<Coordinate[]>([]);

	/**
	 * @NOTE: vykreslim mrizku 10x10px
	 */
	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			context && drawGrid(context);
		}
	}, []);

	/**
	 * @NOTE: zisk nejkratsi cesty
	 */
	useEffect(() => {
		if (finalNode) {
			const shortestPathNodesInOrder = getShortestPathNodesInOrder(finalNode);
			setShortestPathInOrder(shortestPathNodesInOrder);
		}
	}, [finalNode]);

	/**
	 * @NOTE: neustala aktualizace gridu dle toho, jak si vse naklikame
	 */
	useEffect(() => {
		const updatedGrid = getUpdatedGrid(walls, startNode, finishNode);
		setGrid(updatedGrid);
	}, [finishNode, startNode, walls]);

	/**
	 * @NOTE: animace hledani cesty
	 */
	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			context && drawShortestPath(context, visitedGridInOrder, shortestPathInOrder);
		}
	}, [shortestPathInOrder, visitedGridInOrder]);

	/**
	 * @NOTE: vykreslim bod zacatku/konce a sten
	 */
	const onMouseInteractionHandler = (event: MouseEvent<HTMLCanvasElement>): void => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');

			if (context) {
				const { pageX, pageY } = event;

				const rowClickPosition = pageY - canvasRef.current.offsetTop;
				const columnClickPosition = pageX - canvasRef.current.offsetLeft;
				const { row, column } = getCoordinates(rowClickPosition, columnClickPosition);

				if (!startNode) {
					drawNode(context, column, row, START);
					return setStartNode({ row, column });
				}

				if (startNode && !finishNode) {
					drawNode(context, column, row, FINISH);
					return setFinishNode({ row, column });
				}

				if (startNode && finishNode) {
					drawNode(context, column, row, WALL);
					return setWalls(prevWalls => [...prevWalls, { row, column }]);
				}
			}
		}
	};

	/**
	 * @NOTE: dijkstra algoritmus
	 */
	const onVisualizeButtonClickHandler = (): void => {
		if (startNode && finishNode) {
			const visitedNodesInOrder: Node[] = [];
			const unvisitedNodes = [...grid];

			while (unvisitedNodes.length > 0) {
				unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
				const closestNode = unvisitedNodes.shift();

				if (closestNode) {
					const { column, distance, row, type } = closestNode;

					if (type === 'wall') {
						continue;
					}

					/**
					 * @NOTE: cesta neexistuje
					 */
					if (closestNode.distance === Infinity) {
						return setVisitedGridInOrder(visitedNodesInOrder);
					}

					closestNode.isVisited = true;
					visitedNodesInOrder.push(closestNode);

					/**
					 * @NOTE: dostaneme se do cile
					 */
					if (row === finishNode.row && column === finishNode.column) {
						setFinalNode(closestNode);
						return setVisitedGridInOrder(visitedNodesInOrder);
					}

					/**
					 * @NOTE: sousedske nody aktualni nody (nahore, dole, doleva, doprava)
					 */
					const neighborNodes: Node[] = [];

					if (row > 5) {
						neighborNodes.push(grid[(WIDTH / 10) * (Math.floor(row / 10) - 1) + Math.floor(column / 10)]);
					}
					if (row < HEIGHT - 5) {
						neighborNodes.push(grid[(WIDTH / 10) * (Math.floor(row / 10) + 1) + Math.floor(column / 10)]);
					}
					if (column > 5) {
						neighborNodes.push(grid[(WIDTH / 10) * Math.floor(row / 10) + Math.floor(column / 10) - 1]);
					}
					if (column < WIDTH - 5) {
						neighborNodes.push(grid[(WIDTH / 10) * Math.floor(row / 10) + Math.floor(column / 10) + 1]);
					}

					/**
					 * @NOTE: nechceme znova navstivovat jiz navstivene -> definujeme vzdalenost a predchozi node
					 */
					neighborNodes
						.filter(neighbor => !neighbor.isVisited)
						.forEach(neighbor => {
							neighbor.distance = distance + 1;
							neighbor.previousNode = closestNode;
						});
				} else {
					return setVisitedGridInOrder(visitedNodesInOrder);
				}
			}
		}
	};

	/**
	 * @NOTE: vse do vychoziho stavu
	 */
	const onClearButtonClickHandler = (): void => {
		setFinalNode(undefined);
		setFinishNode(undefined);
		setGrid([]);
		setShortestPathInOrder([]);
		setStartNode(undefined);
		setVisitedGridInOrder([]);
		setWalls([]);

		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			context && drawGrid(context);
		}
	};

	return (
		<>
			<h1>Shortest path</h1>
			<div className={styles.shortestPath}>
				<Grid
					finishNode={finishNode}
					onMouseInteraction={onMouseInteractionHandler}
					ref={canvasRef}
					startNode={startNode}
				/>
				<div className={styles.controls}>
					<Button
						color="grey-800"
						disabled={!startNode || !finishNode}
						onClick={onVisualizeButtonClickHandler}
					>
						Visualize
					</Button>
					<Button color="peach" onClick={onClearButtonClickHandler}>
						Clear
					</Button>
				</div>
			</div>
		</>
	);
};

export default ShortestPath;
