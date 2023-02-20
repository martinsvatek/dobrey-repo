export interface GetAnswerRequestBody {
	model: string;
	prompt: string;
}

export interface GetAnswerResponseData {
	answer: string;
	message: string;
}
