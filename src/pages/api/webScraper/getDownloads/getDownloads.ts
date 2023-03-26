import { ALERT, AUTH_OPTIONS, URL } from 'global/consts';
import { JSDOM } from 'jsdom';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { DOWNLOADS_CLASSNAME } from './getDownloads.consts';
import { GetDownloadsRequestBody, GetDownloadsResponseData } from './getDownloads.types';

const { ACTION_FAILURE, ACTION_SUCCESS, UNAUTHORIZED } = ALERT;
const { NPMJS } = URL;

export const getDownloads = async (
	req: NextApiRequest,
	res: NextApiResponse<GetDownloadsResponseData>,
): Promise<void> => {
	const session = await getServerSession(req, res, AUTH_OPTIONS);
	if (!session) {
		return res.status(401).json({ downloads: 0, alert: UNAUTHORIZED });
	}

	const { packageName } = req.body as GetDownloadsRequestBody;
	const trimedPackageNameInLowerCase = packageName.trim().toLowerCase();

	const fetchedPage = await fetch(`${NPMJS}/package/${trimedPackageNameInLowerCase}`);
	if (fetchedPage.status !== 200) {
		return res.status(fetchedPage.status).json({ downloads: 0, alert: ACTION_FAILURE });
	}

	const html = await fetchedPage.text();
	const {
		window: { document },
	} = new JSDOM(html);
	const downloadsTextContent = document.querySelector(DOWNLOADS_CLASSNAME)?.textContent;
	/**
	 * @NOTE: zachovani pouze cisel ve stringu a prevedeni na cislo
	 */
	const downloads = downloadsTextContent ? +downloadsTextContent.replace(/\D/g, '') : 0;

	res.status(200).json({ downloads, alert: ACTION_SUCCESS });
};
