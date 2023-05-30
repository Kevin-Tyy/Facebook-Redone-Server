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
  firstName : Joi.string().required()
  .messages({
    'string.empty' : "Please enter your first name"
  }),
  lastname : Joi.string().required()
  .messages({
    'string.empty' : "Please enter your first name"
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
const userVerificationSchema = Joi.object({
  userId : Joi.string().trim().required().messages({ 'string.empty' : 'Login to update your profile'}),
  password : Joi.string().trim().required().messages({ 'string.empty' : 'Please enter your password'})
})
const updateProfileSchema = Joi.object({
  userId : Joi.string().trim(),
  username : Joi.string().allow(""),
  email : Joi.string().email().allow("").messages({ 'string.email' : 'Please enter a valid email address'}),
  firstname : Joi.string().allow(""),
  lastname : Joi.string().allow(""),
  bio : Joi.string().allow(""),
  location : Joi.string().allow(""),
  education : Joi.string().allow(""),
  work : Joi.string().allow(""),

})
module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  userVerificationSchema,
  updateProfileSchema
};
