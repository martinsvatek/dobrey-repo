import { FC } from 'react';
import { ROAD_CANVAS_HEIGHT, ROAD_CANVAS_WIDTH } from '../../page.consts';
import styles from './Road.module.scss';
import { RoadProps } from './Road.types';

export const Road: FC<RoadProps> = ({ roadRef }) => (
  <canvas className={styles.road} height={ROAD_CANVAS_HEIGHT} ref={roadRef} width={ROAD_CANVAS_WIDTH} />
);
