export const drawNode = (canvasContext: CanvasRenderingContext2D, column: number, row: number, color: string): void => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(column, row, 4, 0, 2 * Math.PI);
  canvasContext.fill();
};
