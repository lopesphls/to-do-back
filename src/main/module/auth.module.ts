import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthService from 'src/domain/service/auth.service';
import AuthController from 'src/presentation/controllers/auth.controller';
import Authentication from 'src/presentation/middleware/authentication';
import HashGenerator from 'src/utils/hash/hashGenerator';
import UserModule from './user.module';

@Module({
	imports: [UserModule, JwtModule],
	controllers: [AuthController],
	providers: [Authentication, AuthService, HashGenerator],
	exports: [Authentication],
})
export class AuthModule {}
