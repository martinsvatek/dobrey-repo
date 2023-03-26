import { ALERT, AUTH_OPTIONS } from 'global/consts';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GetModelsListResponseData } from './getModelsList.types';

const { FETCH_FAILURE, FETCH_SUCCESS, UNAUTHORIZED } = ALERT;

export const getModelsList = async (
	req: NextApiRequest,
	res: NextApiResponse<GetModelsListResponseData>,
): Promise<void> => {
	const session = await getServerSession(req, res, AUTH_OPTIONS);
	if (!session) {
		return res.status(401).json({ modelsList: [], alert: UNAUTHORIZED });
	}

	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.listModels();
	const models = response.data.data;
	if (!models.length) {
		return res.status(403).json({ modelsList: [], alert: FETCH_FAILURE });
	}

	const modelsList = models.map(({ id }) => id);

	res.status(200).json({ modelsList, alert: FETCH_SUCCESS });
};
