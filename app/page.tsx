import Image from 'next/image';
import { FC } from 'react';
import styles from './page.module.scss';

const App: FC = () => (
  <>
    <Image
      alt="Dobrey Logo"
      className={styles.image}
      height={220}
      src="/dobrey_logo_grey_100.svg"
      width={220}
    />
    <p>
      Welcome to my personal website where I try to improve my programming skills.{' '}
      <i>Martin Svátek</i>
    </p>
  </>
);

export default App;
