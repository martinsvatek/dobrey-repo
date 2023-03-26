import { CAR, LANE, RAY, ROAD_CANVAS, TRAFFIC_CAR, VISUALIZER, VISUALIZER_CANVAS } from './page.consts';
import { Coordinate, Level, Touch, ZeroOne } from './page.types';

/**
 * @NOTE: souradnice auta, kterou berou v potaz i uhel
 */
export const getCarCoordinates = (carPositionX: number, carPositionY: number, carAngle: number): Coordinate[] => {
	const { HEIGHT, WIDTH } = CAR;

	const carCoordinates: Coordinate[] = [];

	const radius = Math.hypot(WIDTH, HEIGHT) / 2;
	const angle = Math.atan2(WIDTH, HEIGHT);

	carCoordinates.push({
		x: carPositionX - Math.sin(carAngle - angle) * radius,
		y: carPositionY - Math.cos(carAngle - angle) * radius,
	});
	carCoordinates.push({
		x: carPositionX - Math.sin(carAngle + angle) * radius,
		y: carPositionY - Math.cos(carAngle + angle) * radius,
	});
	carCoordinates.push({
		x: carPositionX - Math.sin(Math.PI + carAngle - angle) * radius,
		y: carPositionY - Math.cos(Math.PI + carAngle - angle) * radius,
	});
	carCoordinates.push({
		x: carPositionX - Math.sin(Math.PI + carAngle + angle) * radius,
		y: carPositionY - Math.cos(Math.PI + carAngle + angle) * radius,
	});

	return carCoordinates;
};

/**
 * @NOTE: vypocet rovnomerneho rozlozeni
 * levy krajni pozice + vzdalenost mezi krajnimi pozicemi * procentualni cast teto vzdalenost (napr. u road - 0, 1/3, 2/3, 1)
 */
export const getLinearInterpolation = (left: number, right: number, percentage: number): number =>
	left + (right - left) * percentage;

/**
 * @NOTE: souradnice krajnic
 */
export const getRoadSides = (): Coordinate[][] => {
	const { LEFT_POSITION, RIGHT_POSITION } = LANE;
	const { INFINITY } = ROAD_CANVAS;

	const bottomLeft = { x: LEFT_POSITION, y: INFINITY };
	const bottomRight = { x: RIGHT_POSITION, y: INFINITY };
	const topLeft = { x: LEFT_POSITION, y: -INFINITY };
	const topRight = { x: RIGHT_POSITION, y: -INFINITY };

	const roadSides = [
		[topLeft, bottomLeft],
		[topRight, bottomRight],
	];

	return roadSides;
};

/**
 * @NOTE: zisk dotyku dvou usecek
 */
export const getIntersection = (
	sensorRayFrom: Coordinate,
	sensorRayTo: Coordinate,
	obstacleFrom: Coordinate,
	obstacleTo: Coordinate,
): Touch | null => {
	const tTop =
		(obstacleTo.x - obstacleFrom.x) * (sensorRayFrom.y - obstacleFrom.y) -
		(obstacleTo.y - obstacleFrom.y) * (sensorRayFrom.x - obstacleFrom.x);
	const uTop =
		(obstacleFrom.y - sensorRayFrom.y) * (sensorRayFrom.x - sensorRayTo.x) -
		(obstacleFrom.x - sensorRayFrom.x) * (sensorRayFrom.y - sensorRayTo.y);
	const bottom =
		(obstacleTo.y - obstacleFrom.y) * (sensorRayTo.x - sensorRayFrom.x) -
		(obstacleTo.x - obstacleFrom.x) * (sensorRayTo.y - sensorRayFrom.y);

	if (bottom !== 0) {
		const t = tTop / bottom;
		const u = uTop / bottom;

		/**
		 * @NOTE: chceme jen pruniky usecek, ne nekonecnych primek
		 */
		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return {
				x: getLinearInterpolation(sensorRayFrom.x, sensorRayTo.x, t),
				y: getLinearInterpolation(sensorRayFrom.y, sensorRayTo.y, t),
				offset: t,
			};
		}
	}

	return null;
};

const getCarTouchedObstacle = (carCoordinates: Coordinate[], obstacle: Coordinate[]): boolean => {
	for (let i = 0; i <= carCoordinates.length - 1; i++) {
		for (let j = 0; j <= obstacle.length - 1; j++) {
			const touch = getIntersection(
				carCoordinates[i],
				carCoordinates[(i + 1) % carCoordinates.length],
				obstacle[j],
				obstacle[(j + 1) % obstacle.length],
			);

			if (touch) {
				return true;
			}
		}
	}

	return false;
};

export const getIsDamaged = (carCoordinates: Coordinate[], trafficCarsCoordinates: Coordinate[][]): boolean => {
	const roadSides = getRoadSides();

	let isDamaged = false;

	/**
	 * @NOTE: kontrola kolize s krajnici
	 */
	roadSides.forEach((roadSide): void => {
		const isObstacleTouched = getCarTouchedObstacle(carCoordinates, roadSide);

		if (isObstacleTouched) {
			isDamaged = true;
		}
	});

	/**
	 * @NOTE: kontrola kolize s jinym autem
	 */
	trafficCarsCoordinates.forEach((trafficCarsCoordinate): void => {
		const isObstacleTouched = getCarTouchedObstacle(carCoordinates, trafficCarsCoordinate);

		if (isObstacleTouched) {
			isDamaged = true;
		}
	});

	return isDamaged;
};

export const getLaneCenter = (laneIndex: number): number => {
	const { COUNT, LEFT_POSITION, WIDTH } = LANE;

	const roadSideWidth = LEFT_POSITION + WIDTH / 2;
	/**
	 * @NOTE: vypocet sirky vsech pruhu silnice bez krajnic vcetne car a stredovych car
	 * vypocet = sirka canvasu - sirky krajnic vcetne car - sirky stredovych car na silnici
	 */
	const lanesWidth = ROAD_CANVAS.WIDTH - roadSideWidth * 2 - WIDTH * (COUNT - 1);
	const laneWidth = lanesWidth / COUNT;

	/**
	 * @NOTE: vypocet x-ovych stredovych souradnic pro jednotlive pruhy silnice
	 * vypocet = sirka krajnice vcetne cary + polovicni sirka pruhu silnice + pripadne dalsi pruhy silnice a stredove pruhy
	 */
	const laneCenterPositionX = roadSideWidth + laneWidth / 2 + Math.min(laneIndex, COUNT - 1) * (laneWidth + WIDTH);

	return laneCenterPositionX;
};

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

/**
 * @NOTE: aktivacni funkce - predvari sumaci vstupnich hodnot s vahamy vstupy na vystupy
 */
const getUpdatedNeuralNetworkLevel = (offsets: number[], level: Level): Level => {
	/**
	 * @NOTE: v prvnim levelu jsou vstupy offsety senzoru, ve druhem levelu jsou vstupy vystupy predchoziho levelu
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
		index === 0 ? level : getUpdatedNeuralNetworkLevel(levels[0].outputs, level),
	);

	return neuralNetworkLevels;
};

/**
 * @NOTE: mutuje neuronovou sit na zaklade procenta, jak moc chceme, aby byla odlisna od predchozi (ulozene)
 */
export const getNeuralNetworkLevelsMutation = (levels: Level[], differencePercentage = 1): Level[] => {
	const mutatedLevels = levels.map(level => ({
		...level,
		biases: level.biases.map(bias => getLinearInterpolation(bias, Math.random() * 2 - 1, differencePercentage)),
		weights: level.weights.map(weight =>
			weight.map(weightElement =>
				getLinearInterpolation(weightElement, Math.random() * 2 - 1, differencePercentage),
			),
		),
	}));

	return mutatedLevels;
};

/**
 * @NOTE: vypocet rovnomerneho rozlozeni s ohlidanim toho, ze by byla pouze jedna pozice (napr. kvuli jednomu senzoru)
 */
export const getPositionX = (
	leftPosition: number,
	rightPosition: number,
	positionsCount: number,
	index: number,
): number =>
	getLinearInterpolation(leftPosition, rightPosition, positionsCount > 1 ? index / (positionsCount - 1) : 0.5);

export const getSensorRays = (carPositionX: number, carPositionY: number, carAngle: number): Coordinate[][] => {
	const { COUNT, LENGTH, SPREAD } = RAY;
	const sensorRays: Coordinate[][] = [];

	for (let i = 0; i <= COUNT - 1; i++) {
		/**
		 * @NOTE: uhel paprsku senzoru
		 */
		const rayAngle = getPositionX(SPREAD / 2, -SPREAD / 2, COUNT, i) + carAngle;

		const from = { x: carPositionX, y: carPositionY };
		const to = {
			x: carPositionX - Math.sin(rayAngle) * LENGTH,
			y: carPositionY - Math.cos(rayAngle) * LENGTH,
		};

		sensorRays.push([from, to]);
	}

	return sensorRays;
};

const getTouchWithMinOffset = (
	sensorRay: Coordinate[],
	roadSides: Coordinate[][],
	trafficCarsCoordinates: Coordinate[][],
): Touch | null => {
	const touches: Touch[] = [];

	roadSides.forEach(roadSide => {
		/**
		 * @NOTE: souradnice a offset mista doteku
		 */
		const touch = getIntersection(sensorRay[0], sensorRay[1], roadSide[0], roadSide[1]);
		touch && touches.push(touch);
	});

	trafficCarsCoordinates.forEach(trafficCarCoordinates => {
		const carCoordinates = trafficCarCoordinates;

		for (let i = 0; i <= carCoordinates.length - 1; i++) {
			/**
			 * @NOTE: souradnice a offset mista doteku
			 */
			const touch = getIntersection(
				sensorRay[0],
				sensorRay[1],
				carCoordinates[i],
				carCoordinates[(i + 1) % carCoordinates.length],
			);
			touch && touches.push(touch);
		}
	});

	if (touches.length === 0) {
		return null;
	}

	/**
	 * @NOTE: nejblizsi misto doteku
	 */
	const offsets = touches.map(touch => touch.offset);
	const minOffset = Math.min(...offsets);
	const touchWithMinOffset = touches.find(touch => touch.offset === minOffset) || touches[0];

	return touchWithMinOffset;
};

export const getTouches = (sensorRays: Coordinate[][], trafficCarsCoordinates: Coordinate[][]): (Touch | null)[] => {
	const roadSides = getRoadSides();

	const touches: (Touch | null)[] = [];

	sensorRays.forEach(sensorRay => {
		touches.push(getTouchWithMinOffset(sensorRay, roadSides, trafficCarsCoordinates));
	});

	return touches;
};

export const getTrafficCarsCoordinates = (trafficCarPositionY: number): Coordinate[][] => {
	const { RANDOM } = LANE;
	let rowLevel = 0;

	return RANDOM.map((randomLine, index) => {
		if (index % 2 === 0) {
			rowLevel++;
		}

		return getCarCoordinates(getLaneCenter(randomLine), trafficCarPositionY - rowLevel * 300, 0);
	});
};

/**
 * @NOTE: zaporne hodnoty jsou cervene, kladne hodnoty jsou bile
 */
export const getRGBA = (weight: number): string => {
	const R = weight > 0 ? 51 : 220;
	const G = weight > 0 ? 51 : 48;
	const B = weight > 0 ? 51 : 60;
	const alpha = Math.abs(weight);

	return `rgba(${R},${G},${B},${alpha})`;
};

export const drawCar = (
	canvasContext: CanvasRenderingContext2D,
	carCoordinates: Coordinate[],
	isDamaged: boolean,
	isSensorVisible: boolean,
	carIndex: number,
): void => {
	const { COLOR, COLOR_DAMAGED, COLOR_SAVED } = CAR;

	if (isDamaged) {
		canvasContext.fillStyle = COLOR_DAMAGED;
	} else {
		canvasContext.fillStyle = carIndex === 0 ? COLOR_SAVED : COLOR;
	}
	/**
	 * @NOTE: pruhlednost aut pro lepsi prehlednost
	 */
	canvasContext.globalAlpha = isSensorVisible ? 1 : 0.2;
	canvasContext.beginPath();
	canvasContext.moveTo(carCoordinates[0].x, carCoordinates[0].y);
	carCoordinates.forEach(carCoordinate => {
		canvasContext.lineTo(carCoordinate.x, carCoordinate.y);
	});
	canvasContext.fill();
	canvasContext.globalAlpha = 1;
};

export const drawRoad = (canvasContext: CanvasRenderingContext2D): void => {
	const { COLOR, COUNT, LEFT_POSITION, RIGHT_POSITION, WIDTH } = LANE;
	const { INFINITY } = ROAD_CANVAS;

	const roadSides = getRoadSides();

	canvasContext.lineWidth = WIDTH;
	canvasContext.strokeStyle = COLOR;
	/**
	 * @NOTE: vykresleni krajnicovych car
	 */
	roadSides.forEach(roadSide => {
		canvasContext.beginPath();
		canvasContext.moveTo(roadSide[0].x, roadSide[0].y);
		canvasContext.lineTo(roadSide[1].x, roadSide[1].y);
		canvasContext.stroke();
	});

	/**
	 * @NOTE: vykresleni stredovych car
	 */
	canvasContext.setLineDash([30, 60]);
	for (let i = 1; i <= COUNT - 1; i++) {
		const lanePositionX = getLinearInterpolation(LEFT_POSITION, RIGHT_POSITION, i / COUNT);

		canvasContext.beginPath();
		canvasContext.moveTo(lanePositionX, -INFINITY);
		canvasContext.lineTo(lanePositionX, INFINITY);
		canvasContext.stroke();
	}
};

export const drawSensorRays = (
	canvasContext: CanvasRenderingContext2D,
	sensorRays: Coordinate[][],
	touches: (Touch | null)[],
): void => {
	const { COLOR, CONFLICT_COLOR, COUNT, WIDTH } = RAY;
	canvasContext.setLineDash([]);
	for (let i = 0; i <= COUNT - 1; i++) {
		/**
		 * @NOTE: nejvzdalenejsi bod senzoroveho paprsku
		 */
		let to: Coordinate | Touch = sensorRays[i][1];
		/**
		 * @NOTE: nejvzdalenejsi bod doteku paprsku s prekazkou
		 */
		const touch = touches[i];
		if (touch) {
			to = touch;
		}

		canvasContext.lineWidth = WIDTH;

		canvasContext.setLineDash([1, 8]);
		canvasContext.strokeStyle = COLOR;
		canvasContext.beginPath();
		canvasContext.moveTo(sensorRays[i][0].x, sensorRays[i][0].y);
		canvasContext.lineTo(to.x, to.y);
		canvasContext.stroke();

		canvasContext.setLineDash([8, 2]);
		canvasContext.strokeStyle = CONFLICT_COLOR;
		canvasContext.beginPath();
		canvasContext.moveTo(sensorRays[i][1].x, sensorRays[i][1].y);
		canvasContext.lineTo(to.x, to.y);
		canvasContext.stroke();
	}
};

export const drawTrafficCar = (canvasContext: CanvasRenderingContext2D, carCoordinates: Coordinate[]): void => {
	const { COLOR } = TRAFFIC_CAR;

	canvasContext.fillStyle = COLOR;
	canvasContext.beginPath();
	canvasContext.moveTo(carCoordinates[0].x, carCoordinates[0].y);
	carCoordinates.forEach(carCoordinate => {
		canvasContext.lineTo(carCoordinate.x, carCoordinate.y);
	});
	canvasContext.fill();
};

export const drawVisualizer = (canvasContext: CanvasRenderingContext2D, levels: Level[], time?: number): void => {
	const { INNER_HEIGHT, INNER_POSITION_LEFT, INNER_POSITION_RIGHT, INNER_POSITION_TOP } = VISUALIZER_CANVAS;
	const { ARROW_ALIGN, ARROW_BASELINE, ARROW_COLOR, ARROW_FONT, LINE_WIDTH, NODE_RADIUS } = VISUALIZER;
	/**
	 * @NOTE: animace pohybu
	 */
	if (time) {
		canvasContext.lineDashOffset = -time / 40;
	}

	for (let i = 0; i <= levels.length - 1; i++) {
		const { biases, inputs, outputs, weights } = levels[i];

		const levelHeight = INNER_HEIGHT / levels.length;
		const levelPositionTop =
			INNER_POSITION_TOP +
			getLinearInterpolation(INNER_HEIGHT - levelHeight, 0, levels.length === 1 ? 0.5 : i / (levels.length - 1));
		const levelPositionBottom = levelPositionTop + levelHeight;

		/**
		 * @NOTE: linie spojujici nody
		 */
		for (let j = 0; j <= inputs.length - 1; j++) {
			for (let k = 0; k <= outputs.length - 1; k++) {
				const lineBottomPositionX = getPositionX(INNER_POSITION_LEFT, INNER_POSITION_RIGHT, inputs.length, j);
				const lineTopPositionX = getPositionX(INNER_POSITION_LEFT, INNER_POSITION_RIGHT, outputs.length, k);

				const weight = weights[j][k];

				canvasContext.setLineDash([4, 20]);
				canvasContext.lineWidth = LINE_WIDTH;
				canvasContext.strokeStyle = getRGBA(weight);
				canvasContext.beginPath();
				canvasContext.moveTo(lineBottomPositionX, levelPositionBottom);
				canvasContext.lineTo(lineTopPositionX, levelPositionTop);
				canvasContext.stroke();
			}
		}

		/**
		 * @NOTE: nody na vstupu
		 */
		for (let j = 0; j <= inputs.length - 1; j++) {
			const nodePositionX = getPositionX(INNER_POSITION_LEFT, INNER_POSITION_RIGHT, inputs.length, j);

			canvasContext.fillStyle = getRGBA(inputs[j] || 0.05);
			canvasContext.beginPath();
			canvasContext.arc(nodePositionX, levelPositionBottom, NODE_RADIUS, 0, Math.PI * 2);
			canvasContext.fill();
		}

		/**
		 * @NOTE: nody ve vrstvach
		 */
		for (let j = 0; j <= outputs.length - 1; j++) {
			const nodePositionX = getPositionX(INNER_POSITION_LEFT, INNER_POSITION_RIGHT, outputs.length, j);

			canvasContext.fillStyle = getRGBA(outputs[j]);
			canvasContext.beginPath();
			canvasContext.arc(nodePositionX, levelPositionTop, NODE_RADIUS, 0, Math.PI * 2);
			canvasContext.fill();

			if (i === levels.length - 1) {
				const arrows = ['↑', '↓', '←', '→'];

				canvasContext.beginPath();
				canvasContext.textAlign = ARROW_ALIGN as CanvasTextAlign;
				canvasContext.textBaseline = ARROW_BASELINE as CanvasTextBaseline;
				canvasContext.fillStyle = ARROW_COLOR;
				canvasContext.font = ARROW_FONT;
				canvasContext.fillText(arrows[j], nodePositionX, levelPositionTop);
			}

			/**
			 * @NOTE: tendence kolem nodu
			 */
			canvasContext.setLineDash([1, 1]);
			canvasContext.lineWidth = LINE_WIDTH * 4;
			canvasContext.strokeStyle = getRGBA(biases[j]);
			canvasContext.beginPath();
			canvasContext.arc(nodePositionX, levelPositionTop, NODE_RADIUS + LINE_WIDTH * 4, 0, Math.PI * 2);
			canvasContext.stroke();
		}
	}
};
