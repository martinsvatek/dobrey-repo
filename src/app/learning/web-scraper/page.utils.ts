import { GetDownloadsResponseData } from 'pages/api/webScraper/getDownloads';

export const getDownloads = async (packageName: string): Promise<GetDownloadsResponseData> => {
	const response = await fetch('/api/webScraper/getDownloads', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ packageName }),
	});

	return (await response.json()) as GetDownloadsResponseData;
};
