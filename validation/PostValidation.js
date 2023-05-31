const Joi = require('joi')

const createPostValidation = Joi.object({
    postText : Joi.string().required().messages({ 'string.empty': 'Please enter post title'}),
    postMedia : Joi.string().allow(""),
    userId : Joi.string().required(),
})
module.exports = createPostValidation