import { Request, Response } from 'express'
import UserService from './user.service'

export default class UserController {
	public async findUser(req: Request, res: Response) {
		return await UserService
	}
}
