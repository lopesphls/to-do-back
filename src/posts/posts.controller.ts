import { Request, Response } from 'express'
import PostsService from './posts.service'

export default class PostsController {
	private postsService = new PostsService()

	public async findAllPosts(req: Request, res: Response) {
		try {
			const posts = await this.postsService.getAll()
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async findByIdPost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = await this.postsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async createPost(req: Request, res: Response) {
		try {
			const post = req.body
			await this.postsService.createPosts(post)
			return res.status(201)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async updatePost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = this.postsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async deletePost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = this.postsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}
}
