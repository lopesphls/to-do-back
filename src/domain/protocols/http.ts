export type HttpResponse<T> = {
	message?: string;
	statusCode: number;
	body?: T;
};

export type HttpRequest<T> = {
	param?: string | number;
	body?: T;
};
