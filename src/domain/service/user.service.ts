import { Injectable } from '@nestjs/common';
import CreateUser from 'src/domain/dto/user/createUser.dto';
import UpdateUser from 'src/domain/dto/user/updateUser.dto';
import { User } from 'src/domain/entities/user.interface';
import UserRepository from 'src/infra/repository/user.repository';
import PersonalReturns from 'src/utils/errors/personal.returns';
import { HttpResponse } from '../protocols/http';

@Injectable()
export default class UserService {
	constructor(private readonly repository: UserRepository) {}

	public async getAll(): Promise<User[]> {
		const users = await this.repository.getAll();
		if (!users) {
			throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
		}
		return users;
	}

	public async getOne({ id, email }: User): Promise<HttpResponse<User>> {
		if (email !== undefined || email !== null) {
			const user = await this.repository.getOneByEmail(email);
			if (!user) {
				throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
			}
			return {
				message: 'Ok',
				statusCode: 200,
				body: user,
			};
		} else if (id !== undefined || id !== null) {
			const user = await this.repository.getOneById(id);
			if (!user) {
				throw new PersonalReturns({ message: 'Sem conteudo', status: 204 });
			}
			return {
				message: 'Ok',
				statusCode: 200,
				body: user,
			};
		} else {
			throw new PersonalReturns({
				message: 'Usuário não encontrado ou não existe',
				status: 400,
			});
		}
	}

	public async create(user: CreateUser): Promise<void> {
		const userToFind = user.email;
		const checkUser = await this.repository.getOneByEmail(userToFind);
		if (checkUser) {
			throw new PersonalReturns({
				message: 'Email já cadastrado',
				status: 409,
			});
		}
		await this.repository.create(user);
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
