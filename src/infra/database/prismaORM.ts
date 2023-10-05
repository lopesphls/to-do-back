import { PrismaClient } from '@prisma/client';

export default class Database {
	database = new PrismaClient();

	async prismaDisconnect() {
		try {
			await this.database.$disconnect();
		} catch (error) {
			console.error(error);
			await this.database.$disconnect();
			process.exit(1);
		}
	}
}
