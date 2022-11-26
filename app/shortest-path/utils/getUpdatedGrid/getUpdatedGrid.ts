import { GRID_CANVAS_HEIGHT, GRID_CANVAS_WIDTH } from 'app/shortest-path/page.consts';
import { Coordinate, Node, NodeType } from 'app/shortest-path/page.types';

export const getUpdatedGrid = (
  walls: Coordinate[],
  startNode?: Coordinate,
  finishNode?: Coordinate
): Node[] => {
  const updatedGrid: Node[] = [];

  for (let row = 5; row < GRID_CANVAS_HEIGHT; row += 10) {
    for (let column = 5; column < GRID_CANVAS_WIDTH; column += 10) {
      const isFinishNode =
        finishNode !== undefined && row === finishNode.row && column === finishNode.column;
      const isStartNode =
        startNode !== undefined && row === startNode.row && column === startNode.column;
      const isWall = walls.some((wall) => row === wall.row && column === wall.column);

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
