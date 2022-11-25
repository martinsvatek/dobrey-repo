import { Coordinate } from '../../page.types';

export interface TrafficCars {
  animate: () => void;
  draw: (roadContext: CanvasRenderingContext2D) => void;
  getTrafficCoordinates: () => Coordinate[][];
}
