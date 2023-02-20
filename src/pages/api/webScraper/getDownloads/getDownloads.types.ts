export interface GetDownloadsRequestBody {
	packageName: string;
}

export interface GetDownloadsResponseData {
	downloads: number;
	message: string;
}
