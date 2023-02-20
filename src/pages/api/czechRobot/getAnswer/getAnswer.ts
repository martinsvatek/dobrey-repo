import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { GET_ANSWER_MESSAGE_SUCCESS, RESPONSE_WITH_EMPTY_ANSWER } from './getAnswer.consts';
import { GetAnswerRequestBody, GetAnswerResponseData } from './getAnswer.types';

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<GetAnswerResponseData>): Promise<void> => {
	const { model, prompt } = req.body as GetAnswerRequestBody;
	if (prompt.length < 2) {
		return res.status(403).json(RESPONSE_WITH_EMPTY_ANSWER);
	}

	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.createCompletion({
		max_tokens: 1000,
		model,
		prompt,
		temperature: 0.1,
	});

	const answer = response.data.choices[0].text.trim();
	if (!answer) {
		return res.status(403).json(RESPONSE_WITH_EMPTY_ANSWER);
	}

	res.status(200).json({ answer, message: GET_ANSWER_MESSAGE_SUCCESS });
};
