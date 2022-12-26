import {
  ROAD_INFINITY,
  ROAD_LANE_LEFT_POSITION,
  ROAD_LANE_RIGHT_POSITION,
} from '../../page.consts';
import { Coordinate } from '../../page.types';

/**
 * @NOTE: souradnice krajnic
 */
export const getRoadSides = (): Coordinate[][] => {
  const bottomLeft = { x: ROAD_LANE_LEFT_POSITION, y: ROAD_INFINITY };
  const bottomRight = { x: ROAD_LANE_RIGHT_POSITION, y: ROAD_INFINITY };
  const topLeft = { x: ROAD_LANE_LEFT_POSITION, y: -ROAD_INFINITY };
  const topRight = { x: ROAD_LANE_RIGHT_POSITION, y: -ROAD_INFINITY };

  const roadSides = [
    [topLeft, bottomLeft],
    [topRight, bottomRight],
  ];

  return roadSides;
};
