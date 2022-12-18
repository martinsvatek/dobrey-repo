import { Coordinate, Level } from '../../page.types';

export interface Car {
  animate: (trafficCarsCoordinates: Coordinate[][]) => void;
  draw: (roadContext: CanvasRenderingContext2D, isSensorVisible: boolean, carIndex: number) => void;
  getCarPositionY: () => number;
  getLevels: () => Level[];
  setLevels: (levelsOfBestCar: Level[]) => void;
}
