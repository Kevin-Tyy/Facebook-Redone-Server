const { Router } = require('express')
const ReactionController = require('../controllers/ReactionController')
const ReactionRouter = Router();

ReactionRouter.route('/')
    .post(ReactionController.addCommentReaction)

module.exports = ReactionRouter;