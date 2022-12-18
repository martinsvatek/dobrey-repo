import { Coordinate } from '../../page.types';
import { CAR_COLOR, CAR_COLOR_DAMAGED, CAR_COLOR_SAVED } from './drawCar.consts';

export const drawCar = (
  canvasContext: CanvasRenderingContext2D,
  carCoordinates: Coordinate[],
  isDamaged: boolean,
  isSensorVisible: boolean,
  carIndex: number
): void => {
  if (isDamaged) {
    canvasContext.fillStyle = CAR_COLOR_DAMAGED;
  } else {
    canvasContext.fillStyle = carIndex === 0 ? CAR_COLOR_SAVED : CAR_COLOR;
  }
  /**
   * INFO: pruhlednost aut pro lepsi prehlednost
   */
  canvasContext.globalAlpha = isSensorVisible ? 1 : 0.2;
  canvasContext.beginPath();
  canvasContext.moveTo(carCoordinates[0].x, carCoordinates[0].y);
  carCoordinates.forEach((carCoordinate) => {
    canvasContext.lineTo(carCoordinate.x, carCoordinate.y);
  });
  canvasContext.fill();
  canvasContext.globalAlpha = 1;
};
