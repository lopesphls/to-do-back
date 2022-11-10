import { Router } from 'express'
import PostsController from './posts.controller'

const postsRouter = Router()

postsRouter.get('/', (req, res) => {
	PostsController.findAllPosts(req, res)
})

postsRouter.get('/:id', (req, res) => {
	PostsController.findByIdPost(req, res)
})

postsRouter.post('/create', (req, res) => {
	PostsController.createPost(req, res)
})

postsRouter.put('/edit/:id', (req, res) => {
	PostsController.updatePost(req, res)
})

postsRouter.delete('/delete/:id', (req, res) => {
	PostsController.deletePost(req, res)
})

export default postsRouter
