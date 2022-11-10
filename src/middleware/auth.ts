import { Request, Response } from 'express'

export default class Authentication {
	public async UserAuthentication(req: Request, res: Response) {
		const user = req.headers

		// const decode = verify(user, process.env.TOKEN)
	}
}
