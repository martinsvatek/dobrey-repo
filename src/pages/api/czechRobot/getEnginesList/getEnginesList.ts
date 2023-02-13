import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { ResponseData } from '../czechRobot.types';

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> => {
	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.listEngines();

	console.log(response);
};
