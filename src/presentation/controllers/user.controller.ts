import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import CreateUser from 'src/domain/dto/user/createUser.dto';
import UpdateUser from 'src/domain/dto/user/updateUser.dto';
import { User } from 'src/domain/entities/user.interface';
import { HttpResponse } from 'src/domain/protocols/http';
import UserService from 'src/domain/service/user.service';
import Authentication from '../middleware/authentication';

@Controller('/')
export default class UserController {
	constructor(private readonly service: UserService) {}

	@UseGuards(Authentication)
	@Get('/')
	public async getAll(@Res() res: Response): Promise<HttpResponse<undefined>> {
		try {
			const users = await this.service.getAll();
			return res.status(200).json(users);
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@UseGuards(Authentication)
	@Get('/user')
	public async getOne(
		@Body() { email, id }: User,
		@Res() res: Response,
	): Promise<HttpResponse<User>> {
		try {
			if (email) {
				const user = await this.service.getOneByEmail(email);
				return res.status(200).json(user);
			}
			if (id) {
				const user = await this.service.getOneById(id);
				return res.status(200).json(user);
			}
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@Post('/')
	public async create(
		@Body() user: CreateUser,
		@Res() res: Response,
	): Promise<HttpResponse<undefined>> {
		try {
			await this.service.create(user);
			return res.status(201).send('created');
		} catch (error) {
			return res.status(error.status).json(error.message);
		}
	}

	@UseGuards(Authentication)
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

	@UseGuards(Authentication)
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
