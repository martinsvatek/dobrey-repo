import Image from 'next/image';
import styles from './app.module.scss';

const App = () => (
  <>
    <div className={styles.logo}>
      <Image alt="Dobrey Logo" height={280} src="/dobrey_logo.svg" width={280} />
      <h1 className={styles.title}>DOBREY</h1>
    </div>
  </>
);

export default App;
