import { Metadata } from 'next/types';
import { Auth } from 'wrappers';
import { WebScraper } from './WebScraper';

const Page = (): JSX.Element => (
	<Auth role="admin">
		<h1>Web scraper</h1>
		<WebScraper />
	</Auth>
);

export default Page;

export const metadata: Metadata = {
	title: 'Dobrey | Web scraper',
	description: 'Web scraper project for better understanding of working with html data of a website.',

	robots: {
		follow: false,
		index: false,
	},
	themeColor: ' #cccccc',
};
