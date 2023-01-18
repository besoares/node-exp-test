import Post from '../models/postModel.js'

const postController = {};

postController.getallPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

postController.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

postController.createPost = async (req, res, next) => {
    try {
        const {user} = req.session
        const post = await Post.create({...req.body, user_id: user._id})
        
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

postController.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

postController.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success'
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

postController.deleteAll = async (req, res, next) => {
    try {
        await Post.deleteMany()

        res.status(200).json({
            status: 'success'
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            exception: e
        })
    }
}

export default postController;