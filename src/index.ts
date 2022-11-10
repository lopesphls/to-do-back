import express from 'express'

function Server() {
	const app = express()
	const port = process.env.PORT || 3000

	app.get('/', (req, res) => {
		res.json('teste')
	})

	app.listen(port, () => {
		console.log(`server rodando em http://localhost:${port}`)
	})
}

Server()
