const { Router }  =  require('express');
const UserRoute = require('./UserRoute')
const PostRoute = require('./PostRoute')
const StoryRouter = require('./StoryRouter')
const router = Router();

router.use('/user' , UserRoute);
router.use('/post' , PostRoute);
router.use('/story' , StoryRouter);

module.exports = router
