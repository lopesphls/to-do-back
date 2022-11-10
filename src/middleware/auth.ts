import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserService from 'src/user/user.service'

export default class Authentication {
	private userService = new UserService()
	public async UserAuthentication(req: Request, res: Response) {
		const { email, password } = req.body
		const user = await this.userService.getUser(email)

		if (!user) {
			const token = jwt.sign()
		}
	}
}
