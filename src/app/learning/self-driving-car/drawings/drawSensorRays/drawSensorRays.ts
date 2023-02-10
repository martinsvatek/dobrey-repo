import { SENSOR_RAYS_COUNT } from '../../page.consts';
import { Coordinate, Touch } from '../../page.types';
import { SENSOR_RAYS_COLOR, SENSOR_RAYS_CONFLICT_COLOR, SENSOR_RAYS_WIDTH } from './drawSensorRays.consts';

export const drawSensorRays = (
  canvasContext: CanvasRenderingContext2D,
  sensorRays: Coordinate[][],
  touches: (Touch | null)[]
): void => {
  canvasContext.setLineDash([]);
  for (let i = 0; i <= SENSOR_RAYS_COUNT - 1; i++) {
    /**
     * @NOTE: nejvzdalenejsi bod senzoroveho paprsku
     */
    let to: Coordinate | Touch = sensorRays[i][1];
    /**
     * @NOTE: nejvzdalenejsi bod doteku paprsku s prekazkou
     */
    const touch = touches[i];
    if (touch) {
      to = touch;
    }

    canvasContext.lineWidth = SENSOR_RAYS_WIDTH;

    canvasContext.setLineDash([1, 8]);
    canvasContext.strokeStyle = SENSOR_RAYS_COLOR;
    canvasContext.beginPath();
    canvasContext.moveTo(sensorRays[i][0].x, sensorRays[i][0].y);
    canvasContext.lineTo(to.x, to.y);
    canvasContext.stroke();

    canvasContext.setLineDash([8, 2]);
    canvasContext.strokeStyle = SENSOR_RAYS_CONFLICT_COLOR;
    canvasContext.beginPath();
    canvasContext.moveTo(sensorRays[i][1].x, sensorRays[i][1].y);
    canvasContext.lineTo(to.x, to.y);
    canvasContext.stroke();
  }
};
