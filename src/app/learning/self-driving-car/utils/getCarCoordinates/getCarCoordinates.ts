import { Coordinate } from '../../page.types';
import { CAR_HEIGHT, CAR_WIDTH } from './getCarCoordinatest.consts';

/**
 * @NOTE: souradnice auta, kterou berou v potaz i uhel
 */
export const getCarCoordinates = (carPositionX: number, carPositionY: number, carAngle: number): Coordinate[] => {
  const carCoordinates: Coordinate[] = [];

  const radius = Math.hypot(CAR_WIDTH, CAR_HEIGHT) / 2;
  const angle = Math.atan2(CAR_WIDTH, CAR_HEIGHT);

  carCoordinates.push({
    x: carPositionX - Math.sin(carAngle - angle) * radius,
    y: carPositionY - Math.cos(carAngle - angle) * radius,
  });
  carCoordinates.push({
    x: carPositionX - Math.sin(carAngle + angle) * radius,
    y: carPositionY - Math.cos(carAngle + angle) * radius,
  });
  carCoordinates.push({
    x: carPositionX - Math.sin(Math.PI + carAngle - angle) * radius,
    y: carPositionY - Math.cos(Math.PI + carAngle - angle) * radius,
  });
  carCoordinates.push({
    x: carPositionX - Math.sin(Math.PI + carAngle + angle) * radius,
    y: carPositionY - Math.cos(Math.PI + carAngle + angle) * radius,
  });

  return carCoordinates;
};
