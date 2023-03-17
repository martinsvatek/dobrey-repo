export interface GetDownloadsRequestBody {
	packageName: string;
}

export interface GetDownloadsResponseData {
	downloads: number;
	alert: string;
}
