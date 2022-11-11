export interface CreatePostsDto {
	title: string
	description?: string
	checked: boolean
	userId?: string
}

export interface UpdatePostsDto {
	id: string
	title: string
	description?: string
	checked: boolean
	userId?: string
}
