import { Metadata } from 'next/types';
import { Auth } from 'wrappers';
import { SelfDrivingCar } from './SelfDrivingCar';

const Page = (): JSX.Element => (
	<Auth role="admin">
		<h1>Self driving car</h1>
		<SelfDrivingCar />
	</Auth>
);

export default Page;

export const metadata: Metadata = {
	title: 'Dobrey | Self driving car',
	description: 'Self driving car project for better understanding of AI.',

	robots: {
		follow: false,
		index: false,
	},
	themeColor: ' #cccccc',
};
