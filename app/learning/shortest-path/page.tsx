'use client';

import { Button } from 'components';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { drawGrid, drawNode, drawShortestPath } from './drawings';
import {
  FINISH_NODE_COLOR,
  GRID_CANVAS_HEIGHT,
  GRID_CANVAS_WIDTH,
  START_NODE_COLOR,
  WALL_NODE_COLOR,
} from './page.consts';
import styles from './Page.module.scss';
import { Coordinate, Node } from './page.types';
import { getShortestPathNodesInOrder, getUpdatedGrid } from './utils';
import { getCoordinates } from './utils/getCoordinates';

const ShortestPath: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [allowDrawing, setAllowDrawing] = useState(false);
  const [finalNode, setFinalNode] = useState<Node | null>(null);
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
          drawNode(context, column, row, START_NODE_COLOR);
          return setStartNode({ row, column });
        }

        if (startNode && !finishNode) {
          drawNode(context, column, row, FINISH_NODE_COLOR);
          return setFinishNode({ row, column });
        }

        if (startNode && finishNode) {
          drawNode(context, column, row, WALL_NODE_COLOR);
          return setWalls((prevWalls) => [...prevWalls, { row, column }]);
        }
      }
    }
  };

  /**
   * @NOTE: dijkstra algoritmus
   */
  const onClickVisualizeButtonHandler = (): void => {
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

          /**
           * @NOTE: nechceme znova navstivovat jiz navstivene -> definujeme vzdalenost a predchozi node
           */
          neighborNodes
            .filter((neighbor) => !neighbor.isVisited)
            .forEach((neighbor) => {
              neighbor.distance = distance + 1;
              neighbor.previousNode = closestNode;
            });
        } else {
          return setVisitedGridInOrder(visitedNodesInOrder);
        }
      }
    }
  };

  return (
    <div className={styles.shortestPath}>
      <canvas
        className={styles.grid}
        height={GRID_CANVAS_HEIGHT}
        onClick={onMouseInteractionHandler}
        onMouseDown={(): void => {
          finishNode && startNode && setAllowDrawing(true);
        }}
        onMouseLeave={(): void => {
          setAllowDrawing(false);
        }}
        onMouseMove={(event): void => {
          allowDrawing && onMouseInteractionHandler(event);
        }}
        onMouseUp={(): void => {
          setAllowDrawing(false);
        }}
        ref={canvasRef}
        width={GRID_CANVAS_WIDTH}
      />
      <div className={styles.controls}>
        <Button color="grey-700" onClick={onClickVisualizeButtonHandler}>
          VIsualize
        </Button>
        <Button color="peach" onClick={(): void => window.location.reload()}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default ShortestPath;
