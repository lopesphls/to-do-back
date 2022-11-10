import { PrismaClient } from '@prisma/client'
import { validate } from 'class-validator'
import { sign } from 'jsonwebtoken'
import { CreateUserDto, UpdateUserDto, UserAuth } from './user.dto'
import userValidation from './user.validation'

class UserService {
	private prisma = new PrismaClient()

	public async getUser(login: UserAuth) {
		const { email, password } = login

		const user = await this.prisma.user.findUnique({
			where: { email },
		})

		if (!user) {
			return 'Usuário não encontrado'
		}
		if (password === user.password) {
			const token = sign({ id: user.id }, process.env.TOKEN, {
				expiresIn: '1d',
			})

			return {
				user,
				token,
			}
		}
	}

	public async create(user: CreateUserDto) {
		const { name, email, password } = user
		userValidation.email = email
		userValidation.password = password
		const error = await validate(userValidation)
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

export default new UserService()
