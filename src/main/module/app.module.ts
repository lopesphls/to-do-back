import { Module } from '@nestjs/common';
import Database from 'src/infra/database/prismaORM';
import UserModule from './user.module';

@Module({
	imports: [UserModule],
	providers: [Database],
})
export class AppModule {}
