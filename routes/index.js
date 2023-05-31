const { Router }  =  require('express');
const UserRoute = require('./UserRoute')
const PostRoute = require('./PostRoute')
const router = Router();

router.use('/user' , UserRoute);
router.use('/post' , PostRoute);

module.exports = router
