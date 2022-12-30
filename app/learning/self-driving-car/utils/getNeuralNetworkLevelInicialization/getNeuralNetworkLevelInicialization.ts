import { Level, ZeroOne } from '../../page.types';

export const getNeuralNetworkLevelInicialization = (inputsCount: number, outputsCount: number): Level => {
  /**
   * @NOTE: predpripravene formaty prazdnych arrays
   */
  const inputs: number[] = new Array(inputsCount);
  const outputs: ZeroOne[] = new Array(outputsCount);
  const biases: number[] = new Array(outputsCount);
  const weights: number[][] = [];
  for (let i = 0; i <= inputsCount + 1; i++) {
    weights[i] = new Array(outputsCount);
  }

  /**
   * @NOTE: pro zacatek randomizace dat, pokud jiz nemame ulozenou nejakou neuronovou sit
   */
  for (let i = 0; i <= inputsCount - 1; i++) {
    for (let j = 0; j <= outputsCount - 1; j++) {
      weights[i][j] = Math.random() * 2 - 1;
    }
  }

  for (let i = 0; i <= outputsCount - 1; i++) {
    biases[i] = Math.random() * 2 - 1;
  }

  return { inputs, outputs, biases, weights };
};
