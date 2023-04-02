import { CAR, RAY, VISUALIZER } from '../SelfDrivingCar.consts';
import { Car, Coordinate, Level, Touch, ZeroOne } from '../SelfDrivingCar.types';
import {
	drawCar,
	drawSensorRays,
	getCarCoordinates,
	getIsDamaged,
	getLaneCenter,
	getNeuralNetworkLevelInicialization,
	getNeuralNetworkLevels,
	getSensorRays,
	getTouches,
} from '../SelfDrivingCar.utils';

const {
	ACCELERATION,
	ANGLE_INCREMENT,
	DEFAULT_ANGLE,
	DEFAULT_SPEED,
	FRICTION,
	MAX_FORWARD_SPEED,
	MAX_REVERSE_SPEED,
	DEFAULT_POSITION_Y,
	POSSIBLE_MOVE_DIRECTIONS_COUNT,
} = CAR;

const { COUNT } = RAY;

const { HIDDEN_LAYER_ARBITRARY_NUMBER } = VISUALIZER;

export const car = (): Car => {
	let forward: ZeroOne = 0;
	let reverse: ZeroOne = 0;
	let left: ZeroOne = 0;
	let right: ZeroOne = 0;

	let carAngle = DEFAULT_ANGLE;
	let carPositionX = getLaneCenter(1);
	let carPositionY = DEFAULT_POSITION_Y;
	let carSpeed = DEFAULT_SPEED;

	const neurons = [COUNT, HIDDEN_LAYER_ARBITRARY_NUMBER, POSSIBLE_MOVE_DIRECTIONS_COUNT];

	let levels: Level[] = [];
	if (!levels.length) {
		for (let i = 0; i <= neurons.length - 2; i++) {
			levels.push(getNeuralNetworkLevelInicialization(neurons[i], neurons[i + 1]));
		}
	}

	let carCoordinates: Coordinate[] = [];
	let isDamaged = false;
	let sensorRays: Coordinate[][] = [];
	let touches: (Touch | null)[] = [];

	const animate = (trafficCarsCoordinates: Coordinate[][]): void => {
		if (!isDamaged) {
			carCoordinates = getCarCoordinates(carPositionX, carPositionY, carAngle);
			isDamaged = getIsDamaged(carCoordinates, trafficCarsCoordinates);
			sensorRays = getSensorRays(carPositionX, carPositionY, carAngle);
			touches = getTouches(sensorRays, trafficCarsCoordinates);
			const offsets = touches.map(touch => (touch === null ? 0 : 1 - touch.offset));
			levels = getNeuralNetworkLevels(levels, offsets);

			forward = levels[1].outputs[0];
			reverse = levels[1].outputs[1];
			left = levels[1].outputs[2];
			right = levels[1].outputs[3];

			/**
			 * @NOTE: akcelerace rychlosti
			 */
			if (forward && !reverse) {
				carSpeed += ACCELERATION;
			}
			if (reverse && !forward) {
				carSpeed -= ACCELERATION;
			}
			/**
			 * @NOTE: auto se nemuze otacet pri temer nulovem pohybu v pred
			 */
			if (Math.abs(carSpeed) > ACCELERATION) {
				/**
				 * @NOTE: prevraceni ovladani pri couvani
				 */
				const flipCoefficient = carSpeed < 0 ? -1 : 1;

				if (left && !right) {
					carAngle += ANGLE_INCREMENT * flipCoefficient;
				}
				if (right && !left) {
					carAngle -= ANGLE_INCREMENT * flipCoefficient;
				}
			}

			/**
			 * @NOTE: omezeni rychlosti
			 */
			if (carSpeed > MAX_FORWARD_SPEED) {
				carSpeed = MAX_FORWARD_SPEED;
			}
			if (carSpeed < -MAX_REVERSE_SPEED) {
				carSpeed = -MAX_REVERSE_SPEED;
			}

			/**
			 * @NOTE: setrvacnost auta bere v potaz treni
			 */
			if (carSpeed > 0) {
				carSpeed -= FRICTION;
			}
			if (carSpeed < 0) {
				carSpeed += FRICTION;
			}
			if (Math.abs(carSpeed) < FRICTION && !forward && !reverse) {
				carSpeed = 0;
			}

			carPositionX -= Math.sin(carAngle) * carSpeed;
			carPositionY -= Math.cos(carAngle) * carSpeed;
		}
	};

	const draw = (roadContext: CanvasRenderingContext2D, isSensorVisible: boolean, carIndex: number): void => {
		isSensorVisible && drawSensorRays(roadContext, sensorRays, touches);
		drawCar(roadContext, carCoordinates, isDamaged, isSensorVisible, carIndex);
	};

	const getCarPositionY = (): number => carPositionY;

	const getLevels = (): Level[] => levels;

	const setLevels = (levelsOfBestCar: Level[]): void => {
		levels = levelsOfBestCar;
	};

	return { animate, draw, getCarPositionY, getLevels, setLevels };
};
