import { GRID_CANVAS_HEIGHT, GRID_CANVAS_WIDTH } from 'app/learning/shortest-path/page.consts';
import { GRID_COLOR } from './drawGrid.consts';

export const drawGrid = (canvasContext: CanvasRenderingContext2D): void => {
  for (let i = 0; i <= GRID_CANVAS_WIDTH; i += 10) {
    canvasContext.moveTo(i, 0);
    canvasContext.lineTo(i, GRID_CANVAS_HEIGHT);
  }

  for (let i = 0; i <= GRID_CANVAS_HEIGHT; i += 10) {
    canvasContext.moveTo(0, i);
    canvasContext.lineTo(GRID_CANVAS_WIDTH, i);
  }

  canvasContext.strokeStyle = GRID_COLOR;
  canvasContext.stroke();
};
