import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { DOWNLOADS_CLASSNAME, NPM_REGISTER_PACKAGE_URL } from './getDownloads.consts';
import { RequestBody, ResponseData } from './getDownloads.types';

export const getDownloads = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { packageName } = JSON.parse(req.body) as RequestBody;
  const packageNameInLowerCase = packageName.trim().toLowerCase();

  const fetchedPage = await fetch(NPM_REGISTER_PACKAGE_URL + packageNameInLowerCase);
  const html = await fetchedPage.text();

  const dom = new JSDOM(html);
  const { document } = dom.window;

  const downloadsTextContent = document.querySelector(DOWNLOADS_CLASSNAME)?.textContent || '0';
  /**
   * @NOTE: zachovani pouze cisel ve stringu a prevedeni na cislo
   */
  const downloads = +downloadsTextContent.replace(/\D/g, '');

  res.status(200).json({ downloads });
};
