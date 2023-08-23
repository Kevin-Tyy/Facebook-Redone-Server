const Joi = require('joi')

const createPostValidation = Joi.object({
    postText : Joi.string().required().messages({ 'string.empty': 'Please enter post title'}),
    postMedia : Joi.string().allow(""),
    userId : Joi.string().required(),
    isReposted : Joi.boolean(),
    repostedBy : Joi.string()
})
const commentValidation = Joi.object({
    postId : Joi.string().required(),
    userId : Joi.string().required(),
    content : Joi.string().required().messages({ 'string.empty': 'Comment cannot be empty'})
})
const storyValidation = Joi.object({
    storyCaption : Joi.allow(""),
    storyMedia : Joi.string().required().messages({ 'string.empty': 'Story media cannot be empty'}),
    userId : Joi.string().required().messages({ 'string.empty': 'User id cannot be empty'})
})

module.exports = {
    createPostValidation, 
    commentValidation,
    storyValidation
}