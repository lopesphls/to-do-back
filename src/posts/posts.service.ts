import { PrismaClient } from '@prisma/client'
import { CreatePostsDto, UpdatePostsDto } from './posts.dto'

class PostsService {
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

	public async createPosts(posts: CreatePostsDto) {
		return await this.prisma.posts.create({
			data: posts,
		})
	}

	public async updatePosts(posts: UpdatePostsDto, user: string) {
		const { id, checked, description, title } = posts

		return await this.prisma.posts.update({
			data: {
				checked,
				title,
				description,
			},
			where: { id },
		})
	}

	public async deletePosts(id: string) {
		return await this.prisma.posts.delete({ where: { id } })
	}
}

export default new PostsService()
