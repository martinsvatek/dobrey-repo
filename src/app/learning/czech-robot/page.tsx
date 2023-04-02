import { Metadata } from 'next/types';
import { Auth } from 'wrappers';
import { CzechRobot } from './CzechRobot';

const Page = (): JSX.Element => (
	<Auth role="admin">
		<h1>Czech robot</h1>
		<CzechRobot />
	</Auth>
);

export default Page;

export const metadata: Metadata = {
	title: 'Dobrey | Czech robot',
	description: 'Czech robot project for better understanding of openAI models.',

	robots: {
		follow: false,
		index: false,
	},
	themeColor: ' #cccccc',
};
