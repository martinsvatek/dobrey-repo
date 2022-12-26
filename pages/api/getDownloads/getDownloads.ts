import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { RequestBody, ResponseData } from './getDownloads.types';

export const getDownloads = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { packageName } = JSON.parse(req.body) as RequestBody;
  const packageNameInLowerCase = packageName.trim().toLowerCase();

  const fetchedPage = await fetch(`https://www.npmjs.com/package/${packageNameInLowerCase}`);
  const html = await fetchedPage.text();

  const dom = new JSDOM(html);
  const { document } = dom.window;

  const downloadsTextContent = document.querySelector('._9ba9a726')?.textContent || '0';
  const downloads = +downloadsTextContent.replace(/\D/g, '');

  res.status(200).json({ downloads });
};
