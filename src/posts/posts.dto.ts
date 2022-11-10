export interface createPostsDto {
	title: string
	description: string
	checked: boolean
	userId: string
}

export interface updatePostsDto {
	id: string
	title: string
	description: string
	checked: boolean
	userId: string
}
