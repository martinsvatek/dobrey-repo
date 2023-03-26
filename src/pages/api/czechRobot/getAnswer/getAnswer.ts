import { ALERT, AUTH_OPTIONS } from 'global/consts';
import { getServerSession } from 'next-auth/next';
import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GetAnswerRequestBody, GetAnswerResponseData } from './getAnswer.types';

const { ACTION_FAILURE, ACTION_SUCCESS, UNAUTHORIZED } = ALERT;

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<GetAnswerResponseData>): Promise<void> => {
	const session = await getServerSession(req, res, AUTH_OPTIONS);
	if (!session) {
		return res.status(401).json({ answer: '', alert: UNAUTHORIZED });
	}

	const { model, prompt } = req.body as GetAnswerRequestBody;
	if (prompt.length < 2) {
		return res.status(403).json({ answer: '', alert: ACTION_FAILURE });
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
		return res.status(403).json({ answer: '', alert: ACTION_FAILURE });
	}

	res.status(200).json({ answer, alert: ACTION_SUCCESS });
};
