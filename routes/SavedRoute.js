//a route to manage user saved posts

const { Router }  = require('express')
const SavedController = require('../controllers/SavedController')
const SavedPostRouter = Router();

SavedPostRouter.route('/:userId')
    .get(SavedController.getSaved)
SavedPostRouter.route('/')
    .post(SavedController.savePost)
SavedPostRouter.delete('/:postId/:userId', SavedController.deleteSavedPosts)

module.exports = SavedPostRouter;