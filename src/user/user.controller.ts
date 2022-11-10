import { Request, Response } from 'express'
import { CreateUserDto, UserAuth } from './user.dto'
import userService from './user.service'

class UserController {
	public async findUser(req: Request, res: Response) {
		try {
			const login: UserAuth = req.body
			const user = await userService.getUser(login)
			return res.json(user)
		} catch (error) {
			return res.json(error)
		}
	}

	public async create(req: Request, res: Response) {
		try {
			const userDto: CreateUserDto = req.body
			const user = await userService.create(userDto)
			return res.status(201).json(user)
		} catch (error) {
			res.json(error)
		}
	}

	public async updateUser(req: Request, res: Response) {
		try {
			const user = req.body
			await userService.update(user)
			return res.status(200).json('User')
		} catch (error) {
			res.json(error)
		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const { id } = req.params
			await userService.delete(id)
			return res.status(200).json('ok')
		} catch (error) {
			res.json(error)
		}
	}
}

export default new UserController()
