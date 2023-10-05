import { Module } from '@nestjs/common';
import UserService from 'src/domain/service/user.service';
import UserRepository from 'src/infra/repository/user.repository';
import UserController from 'src/presentation/controllers/user.controller';

@Module({
	controllers: [UserController],
	providers: [UserService, UserRepository],
})
export default class UserModule {}
