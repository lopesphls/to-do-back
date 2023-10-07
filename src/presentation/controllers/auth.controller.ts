import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/domain/entities/user.interface';
import AuthService from 'src/domain/service/auth.service';

@Controller('/auth')
export default class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/')
	public async signIn(@Body() { email, password }: User, @Res() res: Response) {
		try {
			const token = await this.authService.signIn(email, password);
			return res.status(200).send(token);
		} catch (error) {
			return res.json(error);
		}
	}
}
