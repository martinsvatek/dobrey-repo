"use client";

import { Button } from "@/components";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/global/utils";
import { FC, useEffect, useRef } from "react";
import { car, trafficCars } from "./animations";
import { Car } from "./animations/car/car.types";
import { Road, Visualizer } from "./components";
import { drawRoad, drawVisualizer } from "./drawings";
import {
  BEST_CAR,
  CARS_COUNT,
  CAR_DEFAULT_POSITION_Y,
  ROAD_CANVAS_HEIGHT,
  VISUALIZER_CANVAS_HEIGHT,
} from "./page.consts";
import styles from "./page.module.scss";
import { Level } from "./page.types";
import { getNeuralNetworkLevelsMutation } from "./utils";

let bestCar: Car;

const SelfDrivingCar: FC = () => {
  const roadRef = useRef<HTMLCanvasElement>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cars: Car[] = [];
    const traffic = trafficCars();

    for (let i = 0; i < CARS_COUNT; i++) {
      cars.push(car());
    }

    bestCar = cars[0];
    /**
     * @NOTE: pokud jiz mame nejakou neuronovou sit, ktera se nam libila a my si ji ulozili,
     * tak se tato sit stava vychozim stavem pro generovani dalsich - nepouzivame jiz nahodnou inicializaci
     */
    if (getLocalStorage("bestNeuralNetwork", []).length) {
      cars.forEach((car, index) => {
        /**
         * @NOTE: auto s indexem 0 ma zachovanou neuronovou sit presne v te podobe, v jake jsme ji ulozili
         */
        car.setLevels(getLocalStorage("bestNeuralNetwork", []) as Level[]);
        index !== 0 &&
          car.setLevels(getNeuralNetworkLevelsMutation(car.getLevels(), 0.08));
      });
    }

    if (roadRef.current && visualizerRef.current) {
      const roadCanvas = roadRef.current;
      const roadContext = roadCanvas.getContext("2d");

      const visualizerCanvas = visualizerRef.current;
      const visualizerContext = visualizerCanvas.getContext("2d");
      if (roadContext && visualizerContext) {
        /**
         * @NOTE: funkce ktera se pousti stale dokola diky requestAnimationFrame()
         */
        const animate = (time?: number): void => {
          /**
           * @NOTE: rozpohybovani cele dopravy
           */
          traffic.animate();
          cars.forEach((car) => {
            car.animate(traffic.getTrafficCoordinates());
          });

          /**
           * @NOTE: aby se auto netahlo jako jedna cara, ale furt zachovavalo svuj puvodni tvar
           */
          bestCar =
            cars.find(
              (car) =>
                car.getCarPositionY() ===
                Math.min(...cars.map((car) => car.getCarPositionY()))
            ) || cars[0];

          /**
           * @NOTE: aby se auto netahlo jako jedna cara, ale furt zachovavalo svuj puvodni tvar
           */
          roadCanvas.height = ROAD_CANVAS_HEIGHT;
          visualizerCanvas.height = VISUALIZER_CANVAS_HEIGHT;

          /**
           * @NOTE: auto stoji na miste a pohybuje se silnice pod nim
           */
          roadContext.save();
          roadContext.translate(
            0,
            -bestCar.getCarPositionY() + CAR_DEFAULT_POSITION_Y
          );
          drawRoad(roadContext);
          traffic.draw(roadContext);
          cars.forEach((car, index) => {
            const isSensorVisible =
              car.getCarPositionY() === bestCar.getCarPositionY();
            car.draw(roadContext, isSensorVisible, index);
          });
          roadContext.restore();

          drawVisualizer(visualizerContext, bestCar.getLevels(), time);

          requestAnimationFrame(animate);
        };

        animate();
      }
    }
  }, []);

  return (
    <>
      <h1>Self driving car</h1>
      <div className={styles.selfDrivingCar}>
        <div className={styles.canvases}>
          <Road roadRef={roadRef} key="zadek" />
          <Visualizer visualizerRef={visualizerRef} />
        </div>
        <div className={styles.controls}>
          <Button onClick={(): void => window.location.reload()}>Reload</Button>
          <Button
            color="grey-700"
            onClick={(): void =>
              setLocalStorage("bestNeuralNetwork", bestCar.getLevels())
            }
          >
            Save
          </Button>
          <Button
            color="grey-700"
            onClick={(): void => setLocalStorage("bestNeuralNetwork", BEST_CAR)}
          >
            Set best saved
          </Button>
          <Button
            color="peach"
            onClick={(): void => removeLocalStorage("bestNeuralNetwork")}
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelfDrivingCar;
