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
}
