import { PrismaClient } from '@prisma/client'
import { validate } from 'class-validator'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import UserValidation from './user.validation'

export default class UserService {
	private prisma = new PrismaClient()
	private validation = new UserValidation()

	public async getUser(email: string) {
		return await this.prisma.user.findUnique({
			where: { email },
		})
	}

	public async create(user: CreateUserDto) {
		const { name, email, password } = user
		this.validation.email = email
		this.validation.password = password
		const error = await validate(this.validation)
		if (error.length === 0) {
			return await this.prisma.user.create({
				data: { name, email, password },
			})
		} else {
			return error
		}
	}

	public async update(user: UpdateUserDto) {
		const { id, email, name, password } = user
		return await this.prisma.user.update({
			where: { id },
			data: {
				email,
				name,
				password,
			},
		})
	}

	public async delete(id: string) {
		return await this.prisma.user.delete({
			where: { id },
		})
	}
}
