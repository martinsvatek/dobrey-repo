import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { DOWNLOADS_CLASSNAME, MESSAGE_FAIL, MESSAGE_SUCCESS, NPM_REGISTER_PACKAGE_URL } from './getDownloads.consts';
import { RequestBody, ResponseData } from './getDownloads.types';

export const getDownloads = async (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> => {
  const { packageName } = JSON.parse(req.body) as RequestBody;
  const trimedPackageNameInLowerCase = packageName.trim().toLowerCase();

  const fetchedPage = await fetch(NPM_REGISTER_PACKAGE_URL + trimedPackageNameInLowerCase);

  if (fetchedPage.status !== 200) {
    return res.status(fetchedPage.status).json({ downloads: 0, message: MESSAGE_FAIL });
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

  res.status(200).json({ downloads, message: MESSAGE_SUCCESS });
};
