import { Coordinate, Touch } from '../../page.types';
import { getIntersection } from '../getIntersection';
import { getRoadSides } from '../getRoadSides';

const getTouchWithMinOffset = (
	sensorRay: Coordinate[],
	roadSides: Coordinate[][],
	trafficCarsCoordinates: Coordinate[][],
): Touch | null => {
	const touches: Touch[] = [];

	roadSides.forEach(roadSide => {
		/**
		 * @NOTE: souradnice a offset mista doteku
		 */
		const touch = getIntersection(sensorRay[0], sensorRay[1], roadSide[0], roadSide[1]);
		touch && touches.push(touch);
	});

	trafficCarsCoordinates.forEach(trafficCarCoordinates => {
		const carCoordinates = trafficCarCoordinates;

		for (let i = 0; i <= carCoordinates.length - 1; i++) {
			/**
			 * @NOTE: souradnice a offset mista doteku
			 */
			const touch = getIntersection(
				sensorRay[0],
				sensorRay[1],
				carCoordinates[i],
				carCoordinates[(i + 1) % carCoordinates.length],
			);
			touch && touches.push(touch);
		}
	});

	if (touches.length === 0) {
		return null;
	}

	/**
	 * @NOTE: nejblizsi misto doteku
	 */
	const offsets = touches.map(touch => touch.offset);
	const minOffset = Math.min(...offsets);
	const touchWithMinOffset = touches.find(touch => touch.offset === minOffset)!;

	return touchWithMinOffset;
};

export const getTouches = (sensorRays: Coordinate[][], trafficCarsCoordinates: Coordinate[][]): (Touch | null)[] => {
	const roadSides = getRoadSides();

	const touches: (Touch | null)[] = [];

	sensorRays.forEach(sensorRay => {
		touches.push(getTouchWithMinOffset(sensorRay, roadSides, trafficCarsCoordinates));
	});

	return touches;
};
