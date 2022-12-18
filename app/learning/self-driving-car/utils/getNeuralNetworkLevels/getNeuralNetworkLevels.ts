import { Level } from '../../page.types';

/**
 * INFO: aktivacni funkce - predvari sumaci vstupnich hodnot s vahamy vstupy na vystupy
 */
const getUpdatedNeuralNetworkLevel = (offsets: number[], level: Level): Level => {
  /**
   * INFO: v prvnim levelu jsou vstupy offsety senzoru, ve druhem levelu jsou vstupy vystupy predchoziho levelu
   */
  for (let i = 0; i <= level.inputs.length - 1; i++) {
    level.inputs[i] = offsets[i];
  }

  for (let i = 0; i <= level.outputs.length - 1; i++) {
    let sum = 0;
    for (let j = 0; j <= level.inputs.length - 1; j++) {
      sum += level.inputs[j] * level.weights[j][i];
    }

    if (sum > level.biases[i]) {
      level.outputs[i] = 1;
    } else {
      level.outputs[i] = 0;
    }
  }

  return level;
};

export const getNeuralNetworkLevels = (levels: Level[], offsets: number[]): Level[] => {
  levels[0] = getUpdatedNeuralNetworkLevel(offsets, levels[0]);

  const neuralNetworkLevels = levels.map((level, index) =>
    index === 0 ? level : getUpdatedNeuralNetworkLevel(levels[0].outputs, level)
  );

  return neuralNetworkLevels;
};
