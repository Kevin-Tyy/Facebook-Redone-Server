const Joi = require('joi');

const registerValidationSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(3)
    .max(15)
    .messages({
      'string.empty': 'Please enter a username',
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username must be at most 15 characters',
    }),

  email: Joi.string()
    .required()
    .min(5)
    .max(50)
    .email()
    .messages({
      'string.empty': 'Please enter an email address',
      'string.min': 'Email cannot be less than 5 characters',
      'string.max': 'Email cannot exceed 50 characters',
      'string.email': 'Enter a valid email address',
    }),

  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[!@#$%^&*])'))
    .messages({
      'string.empty': 'Please enter a password',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one special character',
    }),

  uploadImage: Joi.string().allow(''),
});

const loginValidationSchema = Joi.object({
  username : Joi.string()
  .required()
  .messages({
    'string.empty': 'Please enter a username'
  }),

  password : Joi.string()
  .required()
  .messages({
    'string.empty' : 'Please enter an email',
  })

})
module.exports = {
  registerValidationSchema,
  loginValidationSchema
};
