import { drawCar, drawSensorRays } from '../../drawings';
import { CAR_DEFAULT_POSITION_Y, SENSOR_RAYS_COUNT } from '../../page.consts';
import { Coordinate, Level, Touch, ZeroOne } from '../../page.types';
import {
  getCarCoordinates,
  getIsDamaged,
  getLaneCenter,
  getNeuralNetworkLevelInicialization,
  getNeuralNetworkLevels,
  getSensorRays,
  getTouches,
} from '../../utils';
import {
  CAR_ACCELERATION,
  CAR_ANGLE_INCREMENT,
  CAR_DEFAULT_ANGLE,
  CAR_DEFAULT_SPEED,
  CAR_FRICTION,
  CAR_MAX_FORWARD_SPEED,
  CAR_MAX_REVERSE_SPEED,
  CAR_POSSIBLE_MOVE_DIRECTIONS_COUNT,
  VISUALIZER_HIDDEN_LAYER_ARBITRARY_NUMBER,
} from './car.consts';
import { Car } from './car.types';

export const car = (): Car => {
  let forward: ZeroOne = 0;
  let reverse: ZeroOne = 0;
  let left: ZeroOne = 0;
  let right: ZeroOne = 0;

  let carAngle = CAR_DEFAULT_ANGLE;
  let carPositionX = getLaneCenter(1);
  let carPositionY = CAR_DEFAULT_POSITION_Y;
  let carSpeed = CAR_DEFAULT_SPEED;

  const neurons = [
    SENSOR_RAYS_COUNT,
    VISUALIZER_HIDDEN_LAYER_ARBITRARY_NUMBER,
    CAR_POSSIBLE_MOVE_DIRECTIONS_COUNT,
  ];

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
      const offsets = touches.map((touch) => (touch === null ? 0 : 1 - touch.offset));
      levels = getNeuralNetworkLevels(levels, offsets);

      forward = levels[1].outputs[0];
      reverse = levels[1].outputs[1];
      left = levels[1].outputs[2];
      right = levels[1].outputs[3];

      /**
       * INFO: akcelerace rychlosti
       */
      if (forward && !reverse) {
        carSpeed += CAR_ACCELERATION;
      }
      if (reverse && !forward) {
        carSpeed -= CAR_ACCELERATION;
      }
      /**
       * INFO: auto se nemuze otacet pri temer nulovem pohybu v pred
       */
      if (Math.abs(carSpeed) > CAR_ACCELERATION) {
        /**
         * INFO: prevraceni ovladani pri couvani
         */
        const flipCoefficient = carSpeed < 0 ? -1 : 1;

        if (left && !right) {
          carAngle += CAR_ANGLE_INCREMENT * flipCoefficient;
        }
        if (right && !left) {
          carAngle -= CAR_ANGLE_INCREMENT * flipCoefficient;
        }
      }

      /**
       * INFO: omezeni rychlosti
       */
      if (carSpeed > CAR_MAX_FORWARD_SPEED) {
        carSpeed = CAR_MAX_FORWARD_SPEED;
      }
      if (carSpeed < -CAR_MAX_REVERSE_SPEED) {
        carSpeed = -CAR_MAX_REVERSE_SPEED;
      }

      /**
       * INFO: setrvacnost auta bere v potaz treni
       */
      if (carSpeed > 0) {
        carSpeed -= CAR_FRICTION;
      }
      if (carSpeed < 0) {
        carSpeed += CAR_FRICTION;
      }
      if (Math.abs(carSpeed) < CAR_FRICTION && !forward && !reverse) {
        carSpeed = 0;
      }

      carPositionX -= Math.sin(carAngle) * carSpeed;
      carPositionY -= Math.cos(carAngle) * carSpeed;
    }
  };

  const draw = (
    roadContext: CanvasRenderingContext2D,
    isSensorVisible: boolean,
    carIndex: number
  ): void => {
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
