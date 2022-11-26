'use client';

import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { drawGrid, drawShortestPath } from './drawings';
import { GRID_CANVAS_HEIGHT, GRID_CANVAS_WIDTH } from './page.consts';
import styles from './Page.module.scss';
import { Coordinate, Node } from './page.types';
import { getShortestPathNodesInOrder, getUpdatedGrid } from './utils';

const ShortestPath: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [allowDrawing, setAllowDrawing] = useState(false);
  const [finalNode, setFinalNode] = useState<Node | null>(null);
  const [finishNode, setFinishNode] = useState<Coordinate>();
  const [grid, setGrid] = useState<Node[]>([]);
  const [shortestPathInOrder, setShortestPathInOrder] = useState<Node[]>([]);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showVisualizeButton, setShowVisualizeButton] = useState(false);
  const [startNode, setStartNode] = useState<Coordinate>();
  const [visitedGridInOrder, setVisitedGridInOrder] = useState<Node[]>([]);
  const [walls, setWalls] = useState<Coordinate[]>([]);

  /**
   * INFO: vykreslim mrizku 10x10px
   */
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context && drawGrid(context);
    }
  }, []);

  /**
   * INFO: zisk nejkratsi cesty
   */
  useEffect(() => {
    if (finalNode) {
      const shortestPathNodesInOrder = getShortestPathNodesInOrder(finalNode);
      setShortestPathInOrder(shortestPathNodesInOrder);
    }
  }, [finalNode]);

  /**
   * INFO: neustala aktualizace gridu dle toho, jak si vse naklikame
   */
  useEffect(() => {
    const updatedGrid = getUpdatedGrid(walls, startNode, finishNode);
    setGrid(updatedGrid);
  }, [finishNode, startNode, walls]);

  /**
   * INFO: animace hledani cesty
   */
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context && drawShortestPath(context, visitedGridInOrder, shortestPathInOrder);
    }
  }, [shortestPathInOrder, visitedGridInOrder]);

  /* set start and finish node */
  const onMouseMoveCanvasHandler = (event: MouseEvent<HTMLCanvasElement>): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (context) {
        const { clientX, clientY } = event;

        const rowPosition: number = clientY - canvasRef.current.offsetTop;
        const columnPosition: number = clientX - canvasRef.current.offsetLeft;

        let row: number = 0;
        const rowReminder: number = rowPosition % 10;

        if (rowPosition < 5) {
          row = 5;
        } else if (rowPosition > GRID_CANVAS_HEIGHT - 5) {
          row = GRID_CANVAS_HEIGHT - 5;
        } else if (rowReminder === 0) {
          row = rowPosition + 5;
        } else if (rowReminder === 5) {
          row = rowPosition;
        } else if (rowReminder < 5) {
          row = rowPosition - rowReminder + 5;
        } else {
          row = rowPosition - rowReminder + 5;
        }

        let column: number = 0;
        const columnReminder: number = columnPosition % 10;

        if (columnPosition < 5) {
          column = 5;
        } else if (columnPosition > GRID_CANVAS_WIDTH - 5) {
          column = GRID_CANVAS_WIDTH - 5;
        } else if (columnReminder === 0) {
          column = columnPosition + 5;
        } else if (columnReminder === 5) {
          column = columnPosition;
        } else if (columnReminder < 5) {
          column = columnPosition - columnReminder + 5;
        } else {
          column = columnPosition - columnReminder + 5;
        }

        if (!startNode) {
          /* definition of start node */
          context.fillStyle = '#fff';
          context.beginPath();
          context.arc(column, row, 5, 0, 2 * Math.PI);
          context.fill();

          return setStartNode({ row, column });
        }

        /* definition of finish node */
        if (startNode && !finishNode) {
          context.fillStyle = '#fff';
          context.fillRect(column - 5, row - 5, 10, 10);

          setShowVisualizeButton(true);
          return setFinishNode({ row, column });
        }

        /* definition of walls */
        if (startNode && finishNode && allowDrawing) {
          context.fillStyle = '#ff007f';
          context.fillRect(column - 5, row - 5, 10, 10);

          return setWalls([...walls, { row, column }]);
        }
      }
    }
  };

  /* start dijkstra algorithm */
  const onClickVisualizeHandler = (): void => {
    if (startNode && finishNode) {
      const visitedNodesInOrder: Node[] = [];
      const unvisitedNodes: Node[] = [...grid];

      while (unvisitedNodes.length > 0) {
        /* sort unvisited nodes by distance */
        unvisitedNodes.sort((nodeA: Node, nodeB: Node) => nodeA.distance - nodeB.distance);

        const closestNode: Node | undefined = unvisitedNodes.shift();

        if (closestNode) {
          const { row, column, distance, type } = closestNode;

          if (type === 'wall') {
            continue;
          }

          /* way doesn`t exists */
          if (closestNode.distance === Infinity) {
            return setVisitedGridInOrder(visitedNodesInOrder);
          }

          closestNode.isVisited = true;
          visitedNodesInOrder.push(closestNode);

          /* if we hit the finish node */
          if (row === finishNode.row && column === finishNode.column) {
            setFinalNode(closestNode);
            setShowClearButton(true);
            setShowVisualizeButton(false);
            return setVisitedGridInOrder(visitedNodesInOrder);
          }

          /* find closest neighbors of the current closest node */
          const neighborNodes: Node[] = [];

          if (row > 5) {
            neighborNodes.push(
              grid[(GRID_CANVAS_WIDTH / 10) * (Math.floor(row / 10) - 1) + Math.floor(column / 10)]
            );
          }
          if (row < GRID_CANVAS_HEIGHT - 5) {
            neighborNodes.push(
              grid[(GRID_CANVAS_WIDTH / 10) * (Math.floor(row / 10) + 1) + Math.floor(column / 10)]
            );
          }
          if (column > 5) {
            neighborNodes.push(
              grid[(GRID_CANVAS_WIDTH / 10) * Math.floor(row / 10) + Math.floor(column / 10) - 1]
            );
          }
          if (column < GRID_CANVAS_WIDTH - 5) {
            neighborNodes.push(
              grid[(GRID_CANVAS_WIDTH / 10) * Math.floor(row / 10) + Math.floor(column / 10) + 1]
            );
          }

          /* not use visited again */
          const unvisitedNeighborNodes: Node[] = neighborNodes.filter(
            (neighbor) => !neighbor.isVisited
          );

          /* define them distance and previous node */
          unvisitedNeighborNodes.forEach((unvisitedNeighborNode: Node) => {
            unvisitedNeighborNode.distance = distance + 1;
            unvisitedNeighborNode.previousNode = closestNode;
          });
        } else {
          setShowVisualizeButton(false);
          return setVisitedGridInOrder(visitedNodesInOrder);
        }
      }

      setShowVisualizeButton(false);
    }
  };

  /* clear canvas */
  const onClickClearHandler = (): void => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      /* set background black color */
      if (context) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, GRID_CANVAS_WIDTH, GRID_CANVAS_HEIGHT);
      }
    }

    /* set default states */
    setAllowDrawing(false);
    setFinalNode(null);
    setFinishNode(undefined);
    setGrid([]);
    setShortestPathInOrder([]);
    setShowClearButton(false);
    setShowVisualizeButton(false);
    setStartNode(undefined);
    setVisitedGridInOrder([]);
    setWalls([]);
  };

  return (
    <>
      <canvas
        height={GRID_CANVAS_HEIGHT}
        width={GRID_CANVAS_WIDTH}
        className={styles.grid}
        onClick={onMouseMoveCanvasHandler}
        onMouseDown={(): void => setAllowDrawing(true)}
        onMouseMove={(event): void | false | undefined =>
          startNode && finishNode && allowDrawing && onMouseMoveCanvasHandler(event)
        }
        onMouseUp={(): void => {
          setAllowDrawing(false);
        }}
        ref={canvasRef}
      />
      {showVisualizeButton && (
        <button onClick={onClickVisualizeHandler} className={styles.button}>
          Vizualizovat
        </button>
      )}
      {showClearButton && (
        <button onClick={onClickClearHandler} className={styles.button}>
          Vyčistit
        </button>
      )}
    </>
  );
};

export default ShortestPath;
