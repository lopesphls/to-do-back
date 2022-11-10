export interface CreateUserDto {
	name: string
	email: string
	password: string
}

export interface UpdateUserDto {
	id: string
	name: string
	email: string
	password: string
}

export interface UserAuth {
	email: string
	password: string
}
