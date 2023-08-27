const { Router }  =  require('express');
const UserRoute = require('./UserRoute')
const PostRoute = require('./PostRoute')
const StoryRouter = require('./StoryRouter');
const GroupRouter = require('./GroupRoute');
const SavedPostRouter = require('./SavedRoute');
const router = Router();

router.use('/user' , UserRoute);
router.use('/post' , PostRoute);
router.use('/stories' , StoryRouter);
router.use('/groups' , GroupRouter);
router.use('/save', SavedPostRouter)
module.exports = router
