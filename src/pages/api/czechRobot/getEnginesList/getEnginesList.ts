import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GET_ENGINES_LIST_MESSAGE_FAIL, GET_ENGINES_LIST_MESSAGE_SUCCESS } from './getEnginesList.consts';
import { GetEnginesListResponseData } from './getEnginesList.types';

export const getEnginesList = async (
	_: NextApiRequest,
	res: NextApiResponse<GetEnginesListResponseData>,
): Promise<void> => {
	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.listEngines();
	const engines = response.data.data;
	if (!engines.length) {
		return res.status(403).json({ enginesList: [], message: GET_ENGINES_LIST_MESSAGE_FAIL });
	}

	const enginesList = engines.map(({ id }) => id);

	res.status(200).json({ enginesList, message: GET_ENGINES_LIST_MESSAGE_SUCCESS });
};
