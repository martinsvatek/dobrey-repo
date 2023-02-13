import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { MESSAGE_FAIL, MESSAGE_SUCCESS, OPENAI_CONFIGURATION } from '../czechRobot.consts';
import { ResponseData } from '../czechRobot.types';
import { RequestBody } from './getAnswer.types';

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> => {
	const { question } = req.body as RequestBody;

	const responseWithEmptyAnswer = { answer: '', message: MESSAGE_FAIL };

	if (question.length < 2) {
		return res.status(403).json(responseWithEmptyAnswer);
	}

	const openai = new OpenAIApi(OPENAI_CONFIGURATION);
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${question}\nbot: `,
		max_tokens: 200,
		temperature: 0.5,
	});

	const answer = response.data.choices[0].text.trim();
	if (answer) {
		return res.status(200).json({ answer, message: MESSAGE_SUCCESS });
	}

	res.status(403).json(responseWithEmptyAnswer);
};
