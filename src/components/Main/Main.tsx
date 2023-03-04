import styles from './Main.module.scss';
import { MainProps } from './Main.types';

export const Main = ({ children }: MainProps): JSX.Element => <main className={styles.main}>{children}</main>;
