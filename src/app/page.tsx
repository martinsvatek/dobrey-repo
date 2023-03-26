import Image from 'next/image';
import styles from './page.module.scss';

const Home = (): JSX.Element => (
	<>
		<Image alt="Dobrey Logo" className={styles.image} height={220} src="/dobrey_logo_grey_100.svg" width={220} />
		<p>Under construction.</p>
	</>
);

export default Home;
