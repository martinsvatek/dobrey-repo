import type { NextApiRequest, NextApiResponse } from 'next/types';
import { OpenAIApi } from 'openai';
import { MESSAGE_FAIL, MESSAGE_SUCCESS, OPENAI_CONFIGURATION } from './getAnswer.consts';
import { RequestBody, ResponseData } from './getAnswer.types';

export const getAnswer = async (req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> => {
  const { question } = req.body as RequestBody;

  if (question.length < 2) {
    return res.status(403).json({ answer: '', message: MESSAGE_FAIL });
  }

  const openai = new OpenAIApi(OPENAI_CONFIGURATION);
  //   const response = await openai.listEngines();
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `
      Jsi můj šef, který je bezcitný a přísný. Velmi rád nadáváš a mluvíš stroze v krátkých větách. 
      Šéf: Co chceš?
      Osoba: Rád bych dostal přidáno.
      Šéf: Nezasloužíš si.
      Osoba: ${question}?
      Šéf:
    `,
    max_tokens: 200,
    temperature: 0.8,
  });

  const answer = response.data.choices[0].text;
  if (answer) {
    return res.status(200).json({ answer, message: MESSAGE_SUCCESS });
  }

  res.status(403).json({ answer: '', message: MESSAGE_FAIL });
};
