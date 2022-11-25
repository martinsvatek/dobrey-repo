import { Coordinate, Touch } from '../../page.types';
import { getLinearInterpolation } from '../getLinearInterpolation';

/**
 * INFO: zisk dotyku dvou usecek
 */
export const getIntersection = (
  sensorRayFrom: Coordinate,
  sensorRayTo: Coordinate,
  obstacleFrom: Coordinate,
  obstacleTo: Coordinate
): Touch | null => {
  const tTop =
    (obstacleTo.x - obstacleFrom.x) * (sensorRayFrom.y - obstacleFrom.y) -
    (obstacleTo.y - obstacleFrom.y) * (sensorRayFrom.x - obstacleFrom.x);
  const uTop =
    (obstacleFrom.y - sensorRayFrom.y) * (sensorRayFrom.x - sensorRayTo.x) -
    (obstacleFrom.x - sensorRayFrom.x) * (sensorRayFrom.y - sensorRayTo.y);
  const bottom =
    (obstacleTo.y - obstacleFrom.y) * (sensorRayTo.x - sensorRayFrom.x) -
    (obstacleTo.x - obstacleFrom.x) * (sensorRayTo.y - sensorRayFrom.y);

  if (bottom !== 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;

    /**
     * INFO: chceme jen pruniky usecek, ne nekonecnych primek
     */
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: getLinearInterpolation(sensorRayFrom.x, sensorRayTo.x, t),
        y: getLinearInterpolation(sensorRayFrom.y, sensorRayTo.y, t),
        offset: t,
      };
    }
  }

  return null;
};
