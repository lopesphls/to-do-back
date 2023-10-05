import { HttpResponse } from 'src/domain/protocols/http';
import { TypeReturn } from './returns.entitie';

export default class PersonalReturns extends Error {
	status: number;

	message: string;

	constructor({ message, status }: TypeReturn) {
		super();
		this.name = 'Personal returns';
		this.status = status;
		this.message = message;
	}

	public create(): HttpResponse<undefined> {
		return {
			statusCode: 201,
			message: 'Created',
		};
	}
}
