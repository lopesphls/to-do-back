import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserService from 'src/domain/service/user.service';
import UserRepository from 'src/infra/repository/user.repository';
import UserController from 'src/presentation/controllers/user.controller';
import Authentication from 'src/presentation/middleware/authentication';
import HashGenerator from 'src/utils/hash/hashGenerator';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		HashGenerator,
		Authentication,
		JwtService,
	],
	exports: [UserService],
})
export default class UserModule {}
