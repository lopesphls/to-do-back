import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import HashGenerator from 'src/utils/hash/hashGenerator';
import UserService from './user.service';

@Injectable()
export default class AuthService {
	secret = '123456';

	constructor(
		private userService: UserService,
		private hash: HashGenerator,
		private jwt: JwtService,
	) {}

	public async signIn(email: string, password: string) {
		const user = await this.userService.getOneByEmail(email);
		const userAuth = await this.hash.reveal(password, user.password);
		if (!userAuth) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, email: user.email };

		return {
			access_token: await this.jwt.signAsync(payload, {
				secret: this.secret,
				expiresIn: 85000,
			}),
		};
	}
}
