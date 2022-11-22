import Image from 'next/image';
import { FC } from 'react';
import styles from './page.module.scss';

const App: FC = () => (
  <>
    <Image alt="Dobrey Logo" height={220} src="/dobrey_logo.svg" width={220} />
    <h1 className={styles.title}>DOBREY</h1>
  </>
);

export default App;
