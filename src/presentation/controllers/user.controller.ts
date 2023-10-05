import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import CreateUser from 'src/domain/dto/user/createUser.dto';
import UpdateUser from 'src/domain/dto/user/updateUser.dto';
import { User } from 'src/domain/entities/user.interface';
import { HttpRequest, HttpResponse } from 'src/domain/protocols/http';
import UserService from 'src/domain/service/user.service';

@Controller('/')
export default class UserController {
	constructor(private readonly service: UserService) {}

	@Get('/')
	public async getAll(@Res() res: Response): Promise<HttpResponse<undefined>> {
		try {
			const users = await this.service.getAll();
			return res.json(users).status(200);
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@Get('/user')
	public async getOne(
		@Body() findUser: User,
		@Res() res: Response,
	): Promise<HttpResponse<User>> {
		try {
			const user = await this.service.getOne(findUser);
			return res.status(user.statusCode).json(user.body);
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@Post('/')
	public async create(
		@Body() user: HttpRequest<CreateUser>,
		@Res() res: Response,
	): Promise<HttpResponse<undefined>> {
		try {
			await this.service.create(user.body);
			return res.status(201).json('created');
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@Put('/')
	public async update(
		@Body() user: UpdateUser,
		@Res() res: Response,
	): Promise<HttpResponse<undefined>> {
		try {
			await this.service.update(user);
			return res.status(200).json('Dados alterado com sucesso');
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@Delete('/')
	public async delete(
		@Body() user: UpdateUser,
		@Res() res: Response,
	): Promise<HttpResponse<undefined>> {
		try {
			await this.service.delete(user);
			return res.status(200).json('Usuário deletado com sucesso');
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}
}
