import {
  ROAD_CANVAS_WIDTH,
  ROAD_LANE_COUNT,
  ROAD_LANE_LEFT_POSITION,
  ROAD_LANE_WIDTH,
} from '../../page.consts';

export const getLaneCenter = (laneIndex: number): number => {
  const roadSideWidth = ROAD_LANE_LEFT_POSITION + ROAD_LANE_WIDTH / 2;
  /**
   * @NOTE: vypocet sirky vsech pruhu silnice bez krajnic vcetne car a stredovych car
   * vypocet = sirka canvasu - sirky krajnic vcetne car - sirky stredovych car na silnici
   */
  const lanesWidth =
    ROAD_CANVAS_WIDTH - roadSideWidth * 2 - ROAD_LANE_WIDTH * (ROAD_LANE_COUNT - 1);
  const laneWidth = lanesWidth / ROAD_LANE_COUNT;

  /**
   * @NOTE: vypocet x-ovych stredovych souradnic pro jednotlive pruhy silnice
   * vypocet = sirka krajnice vcetne cary + polovicni sirka pruhu silnice + pripadne dalsi pruhy silnice a stredove pruhy
   */
  const laneCenterPositionX =
    roadSideWidth +
    laneWidth / 2 +
    Math.min(laneIndex, ROAD_LANE_COUNT - 1) * (laneWidth + ROAD_LANE_WIDTH);

  return laneCenterPositionX;
};
