import { ALERT, CLIENT_ERROR_RESPONSE, SUCCESSFUL_RESPONSE, URL } from 'global/consts';
import { isAdminServer } from 'global/utils';
import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { CLASSNAME } from './getDownloads.consts';
import { GetDownloadsRequestBody, GetDownloadsResponseData } from './getDownloads.types';

const { ACTION_FAILURE, ACTION_SUCCESS, NO_ACCESS } = ALERT;
const { DOWNLOADS } = CLASSNAME;
const { UNAUTHORIZED } = CLIENT_ERROR_RESPONSE;
const { OK } = SUCCESSFUL_RESPONSE;
const { NPMJS } = URL;

export const getDownloads = async (
	req: NextApiRequest,
	res: NextApiResponse<GetDownloadsResponseData>,
): Promise<void> => {
	if (!isAdminServer(req.headers.authorization)) {
		return res.status(UNAUTHORIZED).json({ downloads: 0, alert: NO_ACCESS });
	}

	const { packageName } = req.body as GetDownloadsRequestBody;
	const trimedPackageNameInLowerCase = packageName.trim().toLowerCase();

	const fetchedPage = await fetch(`${NPMJS}/package/${trimedPackageNameInLowerCase}`);
	if (fetchedPage.status !== OK) {
		return res.status(fetchedPage.status).json({ downloads: 0, alert: ACTION_FAILURE });
	}

	const html = await fetchedPage.text();
	const {
		window: { document },
	} = new JSDOM(html);
	const downloadsTextContent = document.querySelector(DOWNLOADS)?.textContent;
	/**
	 * @NOTE: zachovani pouze cisel ve stringu a prevedeni na cislo
	 */
	const downloads = downloadsTextContent ? +downloadsTextContent.replace(/\D/g, '') : 0;

	res.status(OK).json({ downloads, alert: ACTION_SUCCESS });
};
