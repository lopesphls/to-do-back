import { Router } from 'express'
import PostsController from './posts.controller'

const postsRouter = Router()

const posts = new PostsController()

postsRouter.get('/', (req, res) => {
	posts.findAllPosts(req, res)
})

postsRouter.get('/:id', (req, res) => {
	posts.findByIdPost(req, res)
})
postsRouter.post('/create', (req, res) => {
	posts.createPost(req, res)
})
postsRouter.put('/edit/:id', (req, res) => {
	posts.updatePost(req, res)
})
postsRouter.delete('/delete/:id', (req, res) => {
	posts.deletePost(req, res)
})

export default postsRouter
