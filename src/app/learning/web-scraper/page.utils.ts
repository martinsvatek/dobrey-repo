import { auth } from 'global/config';
import { GetDownloadsResponseData } from 'pages/api/webScraper/getDownloads';

export const getDownloads = async (packageName: string): Promise<GetDownloadsResponseData> => {
	const token = await auth.currentUser?.getIdToken();
	const response = await fetch('/api/webScraper/getDownloads', {
		body: JSON.stringify({ packageName }),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});

	return (await response.json()) as GetDownloadsResponseData;
};
