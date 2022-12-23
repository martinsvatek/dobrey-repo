import { JSDOM } from 'jsdom';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from './getDownloads.types';

export const getDownloads = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const fetchedPage = await fetch('https://www.npmjs.com/package/puppeteer');
  const html = await fetchedPage.text();

  const dom = new JSDOM(html);
  const { querySelector } = dom.window.document;

  const downloadsTextContent = querySelector('._9ba9a726')?.textContent || '0';
  const downloads = +downloadsTextContent.replace(/\D/g, '');

  res.status(200).json({ downloads });
};
