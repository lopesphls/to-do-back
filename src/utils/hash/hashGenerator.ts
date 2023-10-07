import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export default class HashGenerator {
	private saltRounds = 10;

	public async generator(password: string) {
		const newHash = await hash(password, this.saltRounds);
		return newHash;
	}

	public async reveal(password: string, hashPassword: string) {
		try {
			const result = await compare(password, hashPassword);
			return result;
		} catch (error) {
			throw new Error(error);
		}
	}
}
