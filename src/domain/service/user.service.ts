import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import CreateUser from 'src/domain/dto/user/createUser.dto';
import UpdateUser from 'src/domain/dto/user/updateUser.dto';
import { User } from 'src/domain/entities/user.interface';
import UserRepository from 'src/infra/repository/user.repository';
import PersonalReturns from 'src/utils/errors/personal.returns';
import HashGenerator from 'src/utils/hash/hashGenerator';

@Injectable()
export default class UserService {
	constructor(
		private readonly repository: UserRepository,
		private readonly hash: HashGenerator,
	) {}

	public async getAll(): Promise<User[]> {
		const users = await this.repository.getAll();
		if (!users) {
			throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
		}
		return users;
	}

	public async getOneByEmail(email: string) {
		if (email !== undefined || email !== null) {
			const user = await this.repository.getOneByEmail(email);
			if (!user) {
				throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
			}
			return user;
		} else {
			throw new PersonalReturns({
				message: 'Usuário não encontrado ou não existe',
				status: 400,
			});
		}
	}

	public async getOneById(id: string) {
		if (id !== undefined || id !== null) {
			const user = await this.repository.getOneById(id);
			if (!user) {
				throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
			}
			return user;
		} else {
			throw new PersonalReturns({
				message: 'Usuário não encontrado ou não existe',
				status: 400,
			});
		}
	}

	public async create({ email, name, password }: CreateUser): Promise<void> {
		if (!email) {
			throw new PersonalReturns({ message: 'no content', status: 204 });
		}
		const checkUser = await this.repository.getOneByEmail(email);
		if (checkUser) {
			throw new PersonalReturns({
				message: 'Email já cadastrado',
				status: 400,
			});
		}

		const newUser = {
			id: randomUUID(),
			email: email,
			name: name,
			password: await this.hash.generator(password),
		};

		await this.repository.create(newUser);
	}

	public async update(user: UpdateUser): Promise<void> {
		if (user.id === undefined || user.id === null) {
			throw new PersonalReturns({ message: 'No content', status: 204 });
		}
		await this.repository.update(user);
	}

	public async delete(user: User): Promise<void> {
		if (user === undefined || user === null) {
			throw new PersonalReturns({ message: 'No content', status: 204 });
		}
		await this.repository.delete(user);
	}
}
