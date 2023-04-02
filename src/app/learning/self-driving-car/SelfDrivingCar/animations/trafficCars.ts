import { TRAFFIC_CAR } from '../SelfDrivingCar.consts';
import { Coordinate, TrafficCars } from '../SelfDrivingCar.types';
import { drawTrafficCar, getTrafficCarsCoordinates } from '../SelfDrivingCar.utils';

const { ACCELERATION, DEFAULT_POSITION_Y, DEFAULT_SPEED, MAX_FORWARD_SPEED } = TRAFFIC_CAR;

export const trafficCars = (): TrafficCars => {
	let trafficCarPositionY = DEFAULT_POSITION_Y;
	let trafficCarSpeed = DEFAULT_SPEED;

	let trafficCarsCoordinates = getTrafficCarsCoordinates(trafficCarPositionY);

	const animate = (): void => {
		/**
		 * @NOTE: akcelerace rychlosti
		 */
		trafficCarSpeed += ACCELERATION;

		/**
		 * @NOTE: omezeni rychlosti
		 */
		if (trafficCarSpeed > MAX_FORWARD_SPEED) {
			trafficCarSpeed = MAX_FORWARD_SPEED;
		}

		trafficCarPositionY -= trafficCarSpeed;

		trafficCarsCoordinates = getTrafficCarsCoordinates(trafficCarPositionY);
	};

	const draw = (roadContext: CanvasRenderingContext2D): void => {
		trafficCarsCoordinates.forEach(trafficCarsCoordinate => {
			drawTrafficCar(roadContext, trafficCarsCoordinate);
		});
	};

	const getTrafficCoordinates = (): Coordinate[][] => trafficCarsCoordinates;

	return { animate, draw, getTrafficCoordinates };
};
