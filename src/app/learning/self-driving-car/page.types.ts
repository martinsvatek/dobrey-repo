export interface Coordinate {
  x: number;
  y: number;
}

export interface Level {
  inputs: number[];
  outputs: ZeroOne[];
  /**
   * @NOTE: zkresleni - pouziva se k vyrovnani vysledku. Pomaha modelum posunout aktivacni funkci smerek k pozitivni nebo negetivni strane.
   */
  biases: number[];
  /**
   * @NOTE: vahy - vypovidaji o dulezitosti kazdeho prvku, ktery je predan jako vstup do umele neuronove site.
   */
  weights: number[][];
}

export interface Touch extends Coordinate {
  offset: number;
}

export type ZeroOne = 0 | 1;
