const { Router }  = require('express')
const storyController = require('../controllers/storyController')
const StoryRouter = Router();

StoryRouter.route('/')
    .get(storyController.getStories)
    .post(storyController.createStory)

module.exports = StoryRouter;