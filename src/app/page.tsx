import { Metadata } from 'next/types';

const Main = (): JSX.Element => (
	<>
		<h1>Dobrey</h1>
		<p>Under construction.</p>
	</>
);

export default Main;

export const metadata: Metadata = {
	title: 'Dobrey | Main',
	description: 'A place where I try to improve my programming skills.',

	robots: {
		follow: true,
		index: true,
	},
	themeColor: ' #cccccc',
};
