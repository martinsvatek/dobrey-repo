import { Node } from 'app/learning/shortest-path/page.types';
import { SEARCH_COLOR, SHORTEST_PATH_COLOR } from './drawShortestPath.consts';

export const drawShortestPath = (
  canvasContext: CanvasRenderingContext2D,
  visitedGridInOrder: Node[],
  shortestPathInOrder: Node[]
): void => {
  for (let i = 0; i < visitedGridInOrder.length; i++) {
    setTimeout(() => {
      const { column, row, type } = visitedGridInOrder[i];

      if (type === 'default') {
        canvasContext.fillStyle = SEARCH_COLOR;
        canvasContext.beginPath();
        canvasContext.arc(column, row, 3, 0, 2 * Math.PI);
        canvasContext.fill();
      }
    }, i);
  }

  for (let i = 0; i < shortestPathInOrder.length; i++) {
    setTimeout(() => {
      const { column, row } = shortestPathInOrder[i];

      canvasContext.fillStyle = SHORTEST_PATH_COLOR;
      canvasContext.beginPath();
      canvasContext.arc(column, row, 4, 0, 2 * Math.PI);
      canvasContext.fill();
    }, 60 * i);
  }
};
