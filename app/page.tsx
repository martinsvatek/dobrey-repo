import Image from 'next/image';
import styles from './page.module.scss';

const App = () => (
  <>
    <div className={styles.logo}>
      <Image alt="Dobrey Logo" height={220} src="/dobrey_logo.svg" width={220} />
      <h1 className={styles.title}>DOBREY</h1>
    </div>
  </>
);

export default App;
