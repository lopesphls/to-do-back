import { PrismaClient } from '@prisma/client'
import { createPostsDto, updatePostsDto } from './posts.dto'

export default class PostsService {
	private prisma = new PrismaClient()

	public async getAll() {
		return await this.prisma.posts.findMany()
	}

	public async getById(id: string) {
		return await this.prisma.posts.findUnique({
			where: {
				id,
			},
		})
	}

	public async createPosts(posts: createPostsDto) {
		return await this.prisma.posts.create({
			data: posts,
		})
	}

	public async updatePosts(posts: updatePostsDto, user: string) {
		const { id, checked, description, title, userId } = posts
		if (userId === user) {
			return await this.prisma.posts.update({
				data: {
					checked,
					title,
					description,
				},
				where: { id },
			})
		} else {
			return 'Somente o usuário pode alterar o post'
		}
	}

	public async deletePosts(id: string) {
		return await this.prisma.posts.delete({ where: { id } })
	}
}
