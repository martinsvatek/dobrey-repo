import { Coordinate } from '../../page.types';
import { getCarCoordinates } from '../getCarCoordinates';
import { getLaneCenter } from '../getLaneCenter';
import { RANDOM_LANES } from './getTrafficCarsCoordinates.consts';

export const getTrafficCarsCoordinates = (trafficCarPositionY: number): Coordinate[][] => {
  let rowLevel = 0;

  return RANDOM_LANES.map((randomLine, index) => {
    if (index % 2 === 0) {
      rowLevel++;
    }

    return getCarCoordinates(getLaneCenter(randomLine), trafficCarPositionY - rowLevel * 300, 0);
  });
};
