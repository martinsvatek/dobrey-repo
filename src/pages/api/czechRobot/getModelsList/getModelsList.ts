import { ALERT, CLIENT_ERROR_RESPONSE, SUCCESSFUL_RESPONSE } from 'global/consts';
import { isAdminServer } from 'global/utils';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GetModelsListResponseData } from './getModelsList.types';

const { FETCH_FAILURE, FETCH_SUCCESS, NO_ACCESS } = ALERT;
const { FORBIDDEN, UNAUTHORIZED } = CLIENT_ERROR_RESPONSE;
const { OK } = SUCCESSFUL_RESPONSE;

export const getModelsList = async (
	req: NextApiRequest,
	res: NextApiResponse<GetModelsListResponseData>,
): Promise<void> => {
	if (!isAdminServer(req.headers.authorization)) {
		return res.status(UNAUTHORIZED).json({ modelsList: [], alert: NO_ACCESS });
	}

	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.listModels();
	const models = response.data.data;
	if (!models.length) {
		return res.status(FORBIDDEN).json({ modelsList: [], alert: FETCH_FAILURE });
	}

	const modelsList = models.map(({ id }) => id);

	res.status(OK).json({ modelsList, alert: FETCH_SUCCESS });
};
