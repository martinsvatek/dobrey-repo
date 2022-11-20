import { FC } from 'react';
import styles from './Main.module.scss';
import { MainProps } from './Main.types';

export const Main: FC<MainProps> = ({ children }) => (
  <main className={styles.main}>{children}</main>
);
