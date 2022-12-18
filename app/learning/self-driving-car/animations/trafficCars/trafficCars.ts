import { drawTrafficCar } from '../../drawings';
import { Coordinate } from '../../page.types';
import { getTrafficCarsCoordinates } from '../../utils';
import {
  TRAFFIC_CAR_ACCELERATION,
  TRAFFIC_CAR_DEFAULT_POSITION_Y,
  TRAFFIC_CAR_DEFAULT_SPEED,
  TRAFFIC_CAR_MAX_FORWARD_SPEED,
} from './trafficCars.consts';
import { TrafficCars } from './trafficCars.types';

export const trafficCars = (): TrafficCars => {
  let trafficCarPositionY = TRAFFIC_CAR_DEFAULT_POSITION_Y;
  let trafficCarSpeed = TRAFFIC_CAR_DEFAULT_SPEED;

  let trafficCarsCoordinates = getTrafficCarsCoordinates(trafficCarPositionY);

  const animate = (): void => {
    /**
     * INFO: akcelerace rychlosti
     */
    trafficCarSpeed += TRAFFIC_CAR_ACCELERATION;

    /**
     * INFO: omezeni rychlosti
     */
    if (trafficCarSpeed > TRAFFIC_CAR_MAX_FORWARD_SPEED) {
      trafficCarSpeed = TRAFFIC_CAR_MAX_FORWARD_SPEED;
    }

    trafficCarPositionY -= trafficCarSpeed;

    trafficCarsCoordinates = getTrafficCarsCoordinates(trafficCarPositionY);
  };

  const draw = (roadContext: CanvasRenderingContext2D): void => {
    trafficCarsCoordinates.forEach((trafficCarsCoordinate) => {
      drawTrafficCar(roadContext, trafficCarsCoordinate);
    });
  };

  const getTrafficCoordinates = (): Coordinate[][] => {
    return trafficCarsCoordinates;
  };

  return { animate, draw, getTrafficCoordinates };
};
