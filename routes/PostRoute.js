const { Router } = require('express')
const jwtAuth = require('../middleware/jwtAuth')
const PostController = require('../controllers/PostController')
const PostRouter = Router()

PostRouter.route('/')
    .get(PostController.fetchAllPosts)
    .post(PostController.createPost)
PostRouter.route('/:userId')
    .get(PostController.fetchPostsByCreatorId)

PostRouter.route('/:postId')
    .delete(PostController.deletePost)
PostRouter.route('/like')
    .post(PostController.addLike)
PostRouter.route('/unlike')
    .post(PostController.removeLike)
PostRouter.route('/react/like')
    .post(PostController.addLike)
    .delete(PostController.removeLike)

module.exports = PostRouter;

