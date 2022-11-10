import { IsEmail, MinLength } from 'class-validator'

class UserValidation {
	@IsEmail()
	email: string

	@MinLength(6)
	password: string
}

export default new UserValidation()
