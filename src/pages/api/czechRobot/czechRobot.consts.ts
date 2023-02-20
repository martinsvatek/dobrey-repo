import { Configuration } from 'openai';

export const OPENAI_CONFIGURATION = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	organization: 'org-oRmh3hi2GnqVNJdh9rUIZQFg',
});
