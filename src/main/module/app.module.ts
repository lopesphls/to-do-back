import { Module } from '@nestjs/common';
import Database from 'src/infra/database/prismaORM';
import { AuthModule } from './auth.module';
import UserModule from './user.module';

@Module({
	imports: [UserModule, AuthModule],
	providers: [Database],
})
export class AppModule {}
