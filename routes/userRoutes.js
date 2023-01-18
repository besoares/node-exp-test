import express from "express"
import authController from '../controllers/authController.js'

const userRoutes = express.Router()

userRoutes.post('/signup', authController.signUp)
userRoutes.post('/login', authController.login)
userRoutes.get('/all', authController.getAll)

export default userRoutes

