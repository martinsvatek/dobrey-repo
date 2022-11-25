import { Level } from '../../page.types';
import { getLinearInterpolation } from '../getLinearInterpolation';

/**
 * INFO: mutuje neuronovou sit na zaklade procenta, jak moc chceme, aby byla odlisna od predchozi (ulozene)
 */
export const getNeuralNetworkLevelsMutation = (
  levels: Level[],
  differencePercentage: number = 1
): Level[] => {
  const mutatedLevels = levels.map((level) => ({
    ...level,
    biases: level.biases.map((bias) =>
      getLinearInterpolation(bias, Math.random() * 2 - 1, differencePercentage)
    ),
    weights: level.weights.map((weight) =>
      weight.map((weightElement) =>
        getLinearInterpolation(weightElement, Math.random() * 2 - 1, differencePercentage)
      )
    ),
  }));

  return mutatedLevels;
};
