'use client';

import { getLocalStorage } from 'global/utils';
import { RefObject, useEffect } from 'react';
import { CAR, ROAD_CANVAS, TRAFFIC_CAR, VISUALIZER_CANVAS } from './SelfDrivingCar.consts';
import { Car, Level, SelfDrivingCar } from './SelfDrivingCar.types';
import { drawRoad, drawVisualizer, getNeuralNetworkLevelsMutation } from './SelfDrivingCar.utils';
import { car, trafficCars } from './animations';

let bestCar: Car;

export const useSelfDrivingCar = (
	roadRef: RefObject<HTMLCanvasElement>,
	visualizerRef: RefObject<HTMLCanvasElement>,
): SelfDrivingCar => {
	useEffect(() => {
		const { DEFAULT_POSITION_Y } = CAR;
		const { COUNT } = TRAFFIC_CAR;

		const cars: Car[] = [];
		const traffic = trafficCars();

		for (let i = 0; i < COUNT; i++) {
			cars.push(car());
		}

		bestCar = cars[0];
		/**
		 * @NOTE: pokud jiz mame nejakou neuronovou sit, ktera se nam libila a my si ji ulozili,
		 * tak se tato sit stava vychozim stavem pro generovani dalsich - nepouzivame jiz nahodnou inicializaci
		 */
		if (getLocalStorage('bestNeuralNetwork', []).length) {
			cars.forEach((car, index) => {
				/**
				 * @NOTE: auto s indexem 0 ma zachovanou neuronovou sit presne v te podobe, v jake jsme ji ulozili
				 */
				car.setLevels(getLocalStorage('bestNeuralNetwork', []) as Level[]);
				index !== 0 && car.setLevels(getNeuralNetworkLevelsMutation(car.getLevels(), 0.08));
			});
		}

		if (roadRef.current && visualizerRef.current) {
			const roadCanvas = roadRef.current;
			const roadContext = roadCanvas.getContext('2d');

			const visualizerCanvas = visualizerRef.current;
			const visualizerContext = visualizerCanvas.getContext('2d');
			if (roadContext && visualizerContext) {
				/**
				 * @NOTE: funkce ktera se pousti stale dokola diky requestAnimationFrame()
				 */
				const animate = (time?: number): void => {
					/**
					 * @NOTE: rozpohybovani cele dopravy
					 */
					traffic.animate();
					cars.forEach(car => {
						car.animate(traffic.getTrafficCoordinates());
					});

					/**
					 * @NOTE: aby se auto netahlo jako jedna cara, ale furt zachovavalo svuj puvodni tvar
					 */
					bestCar =
						cars.find(
							car => car.getCarPositionY() === Math.min(...cars.map(car => car.getCarPositionY())),
						) || cars[0];

					/**
					 * @NOTE: aby se auto netahlo jako jedna cara, ale furt zachovavalo svuj puvodni tvar
					 */
					roadCanvas.height = ROAD_CANVAS.HEIGHT;
					visualizerCanvas.height = VISUALIZER_CANVAS.HEIGHT;

					/**
					 * @NOTE: auto stoji na miste a pohybuje se silnice pod nim
					 */
					roadContext.save();
					roadContext.translate(0, -bestCar.getCarPositionY() + DEFAULT_POSITION_Y);
					drawRoad(roadContext);
					traffic.draw(roadContext);
					cars.forEach((car, index) => {
						const isSensorVisible = car.getCarPositionY() === bestCar.getCarPositionY();
						car.draw(roadContext, isSensorVisible, index);
					});
					roadContext.restore();

					drawVisualizer(visualizerContext, bestCar.getLevels(), time);

					requestAnimationFrame(animate);
				};

				animate();
			}
		}
	}, [roadRef, visualizerRef]);

	return { bestCar };
};
