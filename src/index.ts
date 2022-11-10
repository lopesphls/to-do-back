import express, { json, urlencoded } from 'express'
import postsRouter from './posts/posts.routes'

function Server() {
	const app = express()
	const port = process.env.PORT || 3000

	app.use(json())
	app.use(urlencoded({ extended: true }))

	app.use('/posts', postsRouter)

	app.listen(port, () => {
		console.log(`server rodando em http://localhost:${port}`)
	})
}

Server()
