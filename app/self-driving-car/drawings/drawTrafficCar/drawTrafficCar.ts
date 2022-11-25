import { Coordinate } from '../../page.types';
import { TRAFFIC_CAR_COLOR } from './drawTrafficCar.consts';

export const drawTrafficCar = (
  canvasContext: CanvasRenderingContext2D,
  carCoordinates: Coordinate[]
): void => {
  canvasContext.fillStyle = TRAFFIC_CAR_COLOR;
  canvasContext.beginPath();
  canvasContext.moveTo(carCoordinates[0].x, carCoordinates[0].y);
  carCoordinates.forEach((carCoordinate) => {
    canvasContext.lineTo(carCoordinate.x, carCoordinate.y);
  });
  canvasContext.fill();
};
