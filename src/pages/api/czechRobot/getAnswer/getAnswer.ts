import { ALERT, CLIENT_ERROR_RESPONSE, SUCCESSFUL_RESPONSE } from 'global/consts';
import { isAdminServer } from 'global/utils';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GetAnswerRequestBody, GetAnswerResponseData } from './getAnswer.types';

const { ACTION_FAILURE, ACTION_SUCCESS, NO_ACCESS } = ALERT;
const { FORBIDDEN, UNAUTHORIZED } = CLIENT_ERROR_RESPONSE;
const { OK } = SUCCESSFUL_RESPONSE;

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<GetAnswerResponseData>): Promise<void> => {
	if (!isAdminServer(req.headers.authorization)) {
		return res.status(UNAUTHORIZED).json({ answer: '', alert: NO_ACCESS });
	}

	const { model, prompt } = req.body as GetAnswerRequestBody;
	if (prompt.length < 2) {
		return res.status(FORBIDDEN).json({ answer: '', alert: ACTION_FAILURE });
	}

	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.createCompletion({
		max_tokens: 1000,
		model,
		prompt,
		temperature: 0.1,
	});

	const answer = response.data.choices[0].text?.trim();
	if (!answer) {
		return res.status(FORBIDDEN).json({ answer: '', alert: ACTION_FAILURE });
	}

	res.status(OK).json({ answer, alert: ACTION_SUCCESS });
};
