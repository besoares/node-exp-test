import express from "express"
import authMiddleware from '../middleware/authMiddleware.js'
import postController from '../controllers/postController.js'

const postRoutes = express.Router()

postRoutes
    .route('/')
    .get(postController.getallPosts)
    .post(authMiddleware, postController.createPost)
    .delete(authMiddleware, postController.deleteAll)

postRoutes
    .route('/:id')
    .get(postController.getPostById)
    .patch(authMiddleware, postController.updatePost)

export default postRoutes;