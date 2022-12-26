import {
  ROAD_INFINITY,
  ROAD_LANE_COUNT,
  ROAD_LANE_LEFT_POSITION,
  ROAD_LANE_RIGHT_POSITION,
  ROAD_LANE_WIDTH,
} from '../../page.consts';
import { getLinearInterpolation, getRoadSides } from '../../utils';
import { ROAD_LANE_COLOR } from './drawRoad.consts';

export const drawRoad = (canvasContext: CanvasRenderingContext2D): void => {
  const roadSides = getRoadSides();

  canvasContext.lineWidth = ROAD_LANE_WIDTH;
  canvasContext.strokeStyle = ROAD_LANE_COLOR;
  /**
   * @NOTE: vykresleni krajnicovych car
   */
  roadSides.forEach((roadSide) => {
    canvasContext.beginPath();
    canvasContext.moveTo(roadSide[0].x, roadSide[0].y);
    canvasContext.lineTo(roadSide[1].x, roadSide[1].y);
    canvasContext.stroke();
  });

  /**
   * @NOTE: vykresleni stredovych car
   */
  canvasContext.setLineDash([30, 60]);
  for (let i = 1; i <= ROAD_LANE_COUNT - 1; i++) {
    const lanePositionX = getLinearInterpolation(
      ROAD_LANE_LEFT_POSITION,
      ROAD_LANE_RIGHT_POSITION,
      i / ROAD_LANE_COUNT
    );

    canvasContext.beginPath();
    canvasContext.moveTo(lanePositionX, -ROAD_INFINITY);
    canvasContext.lineTo(lanePositionX, ROAD_INFINITY);
    canvasContext.stroke();
  }
};
