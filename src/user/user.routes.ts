import { Router } from 'express'
import userController from './user.controller'

const userRouter = Router()

userRouter.get('/', (req, res) => {
	userController.findUser(req, res)
})

userRouter.post('/create', (req, res) => {
	userController.create(req, res)
})

userRouter.put('/edit/:id', (req, res) => {
	userController.updateUser(req, res)
})

userRouter.delete('/delete/:id', (req, res) => {
	userController.delete(req, res)
})

export default userRouter
