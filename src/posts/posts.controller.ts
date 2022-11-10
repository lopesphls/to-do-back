import { Request, Response } from 'express'
import PostsService from './posts.service'

class PostsController {
	public async findAllPosts(req: Request, res: Response) {
		try {
			const posts = await PostsService.getAll()
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async findByIdPost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = await PostsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async createPost(req: Request, res: Response) {
		try {
			const post = req.body
			await PostsService.createPosts(post)
			return res.status(201)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async updatePost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = PostsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}

	public async deletePost(req: Request, res: Response) {
		try {
			const { id } = req.params
			const posts = PostsService.getById(id)
			return res.json(posts).status(200)
		} catch (error) {
			return res.json(error).status(404)
		}
	}
}

export default new PostsController()
