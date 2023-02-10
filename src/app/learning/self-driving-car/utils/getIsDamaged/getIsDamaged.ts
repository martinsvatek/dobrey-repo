import { Coordinate } from '../../page.types';
import { getIntersection } from '../getIntersection';
import { getRoadSides } from '../getRoadSides';

const getCarTouchedObstacle = (carCoordinates: Coordinate[], obstacle: Coordinate[]): boolean => {
	for (let i = 0; i <= carCoordinates.length - 1; i++) {
		for (let j = 0; j <= obstacle.length - 1; j++) {
			const touch = getIntersection(
				carCoordinates[i],
				carCoordinates[(i + 1) % carCoordinates.length],
				obstacle[j],
				obstacle[(j + 1) % obstacle.length],
			);

			if (touch) {
				return true;
			}
		}
	}

	return false;
};

export const getIsDamaged = (carCoordinates: Coordinate[], trafficCarsCoordinates: Coordinate[][]): boolean => {
	const roadSides = getRoadSides();

	let isDamaged = false;

	/**
	 * @NOTE: kontrola kolize s krajnici
	 */
	roadSides.forEach((roadSide): void => {
		const isObstacleTouched = getCarTouchedObstacle(carCoordinates, roadSide);

		if (isObstacleTouched) {
			isDamaged = true;
		}
	});

	/**
	 * @NOTE: kontrola kolize s jinym autem
	 */
	trafficCarsCoordinates.forEach((trafficCarsCoordinate): void => {
		const isObstacleTouched = getCarTouchedObstacle(carCoordinates, trafficCarsCoordinate);

		if (isObstacleTouched) {
			isDamaged = true;
		}
	});

	return isDamaged;
};
