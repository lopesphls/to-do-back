import { Injectable } from '@nestjs/common';
import UpdateUser from 'src/domain/dto/user/updateUser.dto';
import { User } from 'src/domain/entities/user.interface';
import Database from '../database/prismaORM';

@Injectable()
export default class UserRepository extends Database {
	public async getAll(): Promise<User[]> {
		const users = await this.database.user.findMany();
		await this.prismaDisconnect();
		return users;
	}

	public async getOneById(id: string): Promise<User> {
		if (id) {
			const user = await this.database.user.findUnique({
				where: { id },
			});
			await this.prismaDisconnect();
			return user;
		}
	}

	public async getOneByEmail(email: string): Promise<User> {
		const user = await this.database.user.findUnique({
			where: { email },
		});
		await this.prismaDisconnect();
		return user;
	}

	public async create(user: User): Promise<void> {
		await this.database.user.create({
			data: user,
		});
		await this.prismaDisconnect();
	}

	public async update({
		id,
		email,
		name,
		password,
	}: UpdateUser): Promise<void> {
		await this.database.user.update({
			where: { id },
			data: {
				email,
				name,
				password,
			},
		});
		await this.prismaDisconnect();
	}

	public async delete({ id }: User): Promise<void> {
		await this.database.user.delete({
			where: { id },
		});
		await this.prismaDisconnect();
	}
}
