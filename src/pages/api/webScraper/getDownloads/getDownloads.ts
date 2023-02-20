import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import {
	DOWNLOADS_CLASSNAME,
	GET_DOWNLOADS_MESSAGE_FAIL,
	GET_DOWNLOADS_MESSAGE_SUCCESS,
	NPM_REGISTER_PACKAGE_URL,
} from './getDownloads.consts';
import { GetDownloadsRequestBody, GetDownloadsResponseData } from './getDownloads.types';

export const getDownloads = async (
	req: NextApiRequest,
	res: NextApiResponse<GetDownloadsResponseData>,
): Promise<void> => {
	const { packageName } = req.body as GetDownloadsRequestBody;
	const trimedPackageNameInLowerCase = packageName.trim().toLowerCase();

	const fetchedPage = await fetch(NPM_REGISTER_PACKAGE_URL + trimedPackageNameInLowerCase);
	if (fetchedPage.status !== 200) {
		return res.status(fetchedPage.status).json({ downloads: 0, message: GET_DOWNLOADS_MESSAGE_FAIL });
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

	res.status(200).json({ downloads, message: GET_DOWNLOADS_MESSAGE_SUCCESS });
};
