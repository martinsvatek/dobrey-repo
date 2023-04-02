import { Metadata } from 'next/types';
import { Auth } from 'wrappers';
import { ShortestPath } from './ShortestPath';

const Page = (): JSX.Element => (
	<Auth role="admin">
		<h1>Shortest path</h1>
		<ShortestPath />
	</Auth>
);

export default Page;

export const metadata: Metadata = {
	title: 'Dobrey | Shortest path',
	description: 'Shortest path project for better understanding of Canvas.',

	robots: {
		follow: false,
		index: false,
	},
	themeColor: ' #cccccc',
};
