import { IsEmail, MinLength } from 'class-validator'

export default class UserValidation {
	@IsEmail()
	email: string

	@MinLength(6)
	password: string
}
