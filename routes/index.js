import postRoutes from './postRoutes.js'
import userRoutes from './userRoutes.js'

const router = (app) => {
    app.use('/api/v1/posts', postRoutes)
    app.use('/api/v1/users', userRoutes)
}

export default router