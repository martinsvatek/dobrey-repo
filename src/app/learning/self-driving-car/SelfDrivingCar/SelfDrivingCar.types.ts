export interface Coordinate {
	x: number;
	y: number;
}

export type ZeroOne = 0 | 1;

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

export interface Car {
	animate: (trafficCarsCoordinates: Coordinate[][]) => void;
	draw: (roadContext: CanvasRenderingContext2D, isSensorVisible: boolean, carIndex: number) => void;
	getCarPositionY: () => number;
	getLevels: () => Level[];
	setLevels: (levelsOfBestCar: Level[]) => void;
}

export interface SelfDrivingCar {
	bestCar: Car;
}

export interface TrafficCars {
	animate: () => void;
	draw: (roadContext: CanvasRenderingContext2D) => void;
	getTrafficCoordinates: () => Coordinate[][];
}

export interface Touch extends Coordinate {
	offset: number;
}
