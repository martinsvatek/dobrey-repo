'use client';

import { MouseEvent, RefObject, useEffect, useState } from 'react';
import { CANVAS, COLOR } from './page.consts';
import { Coordinate, Node, ShortestPath } from './page.types';
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

export const useShortestPath = (canvasRef: RefObject<HTMLCanvasElement>): ShortestPath => {
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
	}, [canvasRef]);

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
	}, [canvasRef, shortestPathInOrder, visitedGridInOrder]);

	/**
	 * @NOTE: vykreslim bod zacatku/konce a sten
	 */
	const interact = (event: MouseEvent<HTMLCanvasElement>): void => {
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
	const visualize = (): void => {
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
	const clear = (): void => {
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

	return { clear, finishNode, interact, startNode, visualize };
};
