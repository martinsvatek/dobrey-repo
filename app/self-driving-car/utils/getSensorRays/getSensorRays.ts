import { SENSOR_RAYS_COUNT } from '../../page.consts';
import { Coordinate } from '../../page.types';
import { getPositionX } from '../getPositionX';
import { SENSOR_RAYS_LENGTH, SENSOR_RAYS_SPREAD } from './getSensorRays.consts';

export const getSensorRays = (
  carPositionX: number,
  carPositionY: number,
  carAngle: number
): Coordinate[][] => {
  const sensorRays: Coordinate[][] = [];

  for (let i = 0; i <= SENSOR_RAYS_COUNT - 1; i++) {
    /**
     * INFO: uhel paprsku senzoru
     */
    const rayAngle =
      getPositionX(SENSOR_RAYS_SPREAD / 2, -SENSOR_RAYS_SPREAD / 2, SENSOR_RAYS_COUNT, i) +
      carAngle;

    const from = { x: carPositionX, y: carPositionY };
    const to = {
      x: carPositionX - Math.sin(rayAngle) * SENSOR_RAYS_LENGTH,
      y: carPositionY - Math.cos(rayAngle) * SENSOR_RAYS_LENGTH,
    };

    sensorRays.push([from, to]);
  }

  return sensorRays;
};
